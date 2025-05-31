"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Music, Clipboard, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import Image from "next/image"

interface SidebarProps {
  roomInfo: {
    id: string
    name: string
    host: string
    activeUsers: number
    totalSongs: number
  }
  youtubeUrl: string
  setYoutubeUrl: (url: string) => void
  handleAddYoutubeUrl: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (e: React.FormEvent) => void
  isMobile?: boolean
  closeMobileMenu?: () => void
}

interface YouTubeSearchResult {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    thumbnails: {
      default: {
        url: string
      }
    }
  }
}

const extractVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.*|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export default function Sidebar({
  roomInfo,
  youtubeUrl,
  setYoutubeUrl,
  handleAddYoutubeUrl,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isMobile = false,
  closeMobileMenu = () => {},
}: SidebarProps) {
  const [searchResults, setSearchResults] = useState<YouTubeSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [error, setError] = useState("")
  const searchResultsRef = useRef<HTMLDivElement>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const videoId = extractVideoId(youtubeUrl)

  // Copy Room ID function
  const copyRoomId = () => {
    if (!roomInfo.id) return

    navigator.clipboard.writeText(roomInfo.id).then(() => {
      toast.success("Room ID copied to clipboard!")
    }).catch(() => {
      toast.error("Failed to copy Room ID.")
    })
  }

  const handleYouTubeSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setShowSearchResults(true)

    try {
      const response = await axios.get(`/api/youtube-search?q=${encodeURIComponent(searchQuery)}`)

      if (!response) {
        console.error("error while fetching song from youtube")
        toast("error while fetching song from youtube")
        return
      }

      setSearchResults(response.data.items)
    } catch (err) {
      console.error("Search error:", err)
      toast("Failed to search. Please try again.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectVideo = (video: YouTubeSearchResult) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`
    setYoutubeUrl(youtubeUrl)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  const handleAddToQueue = () => {
    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube link.")
      toast("Please enter a YouTube link.")
      return
    }
    if (!videoId) {
      toast("Invalid Youtube URL")
      setError("Invalid YouTube URL.")
      return
    }
    setError("")
    handleAddYoutubeUrl()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleYouTubeSearch()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleYouTubeSearch()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // 🔁 Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) return

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    debounceTimer.current = setTimeout(() => {
      handleYouTubeSearch()
    }, 100)

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [searchQuery])

  return (
    <div className="p-4 space-y-6">
      {/* Logo and room info */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Music className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">StreamSync</h1>
        </motion.div>
        <div className="bg-card rounded-lg p-4 w-full">
          <h2 className="font-semibold">{roomInfo.name}</h2>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-muted-foreground">Room ID: {roomInfo.id}</p>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyRoomId} title="Copy Room ID">
              <Clipboard className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{roomInfo.activeUsers}</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4" />
              <span>{roomInfo.totalSongs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add YouTube URL */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Add to Queue</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Paste YouTube URL..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <Button className="bg-purple-500" onClick={handleAddToQueue}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {videoId && (
          <div className="bg-gray-900 border-gray-800 rounded-b-xl overflow-hidden mt-2">
            <div className="w-full h-fit">
              <LiteYouTubeEmbed title="" id={videoId} />
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2 relative">
        <h2 className="text-sm font-medium">Search YouTube</h2>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button className="bg-purple-500" type="submit" disabled={isSearching}>
            {isSearching ? (
              <>
                <Search className="h-4 w-4" />
                ...
              </>
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </form>

        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div
            ref={searchResultsRef}
            className="absolute z-[999] mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {searchResults.map((result) => (
              <div
                key={result.id.videoId}
                className="flex items-center p-2 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
                onClick={() => handleSelectVideo(result)}
              >
                <div className="flex-shrink-0 w-16 h-12 rounded-xl mr-2 overflow-hidden">
                  <Image
                    width={64}
                    height={48}
                    src={result.snippet.thumbnails.default.url || "/placeholder.svg"}
                    alt={result.snippet.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 truncate text-xs">{result.snippet.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile close button */}
      {isMobile && (
        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full" onClick={closeMobileMenu}>
            Close Menu
          </Button>
        </div>
      )}
    </div>
  )
}
