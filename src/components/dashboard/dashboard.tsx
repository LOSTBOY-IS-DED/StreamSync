"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Menu, X, Users, Moon, Sun, LayoutGrid, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { SidebarContent } from "@/components/dashboard/sidebar-content"
import { VideoPlayer } from "@/components/dashboard/video-player"
import { Queue } from "@/components/dashboard/queue"
import { Chat } from "@/components/dashboard/chat"
import { AlternativeDesign } from "@/components/dashboard/alternative-design"
import { ProfileHover } from "../ui/profile-card"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useWebSocket } from "@/context/WebContext"
import axios from "axios"

interface RoomData {
  room: {
    id: string
    code: string
    name: string
    adminId: string
    allowSongAdd: boolean
  }
  isAdmin: boolean
  userId: string
}

interface DashboardProps {
  roomData: RoomData
}

export function Dashboard({ roomData }: DashboardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  // WebSocket context - now this will work since we're wrapped in WebSocketProvider
  const {
    messages,
    sendMessage,
    queue,
    addSong,
    upvoteSong,
    userUpvotes,
    userId,
    isAdmin,
    nowPlaying,
    nextSong,
    prevSong,
    messageControl,
    chatPaused,
    allowSongAdd,
    songAddStatus,
    userDets,
    userCount,
  } = useWebSocket()

  // State management
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [designMode, setDesignMode] = useState<"modern" | "alternative">("modern")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Room info from props and WebSocket
  const roomInfo = {
    id: roomData.room.code,
    name: roomData.room.name,
    host: "StreamSync",
    activeUsers: userCount || 1,
    totalSongs: queue?.length || 0,
    isAdmin: isAdmin,
  }

  // Transform WebSocket queue data to match component interface
  const queueItems =
    queue?.map((item: any) => ({
      id: item.streamId || item.id,
      title: item.title || "Unknown Title",
      thumbnail: item.bigImg || item.smallImg || "/placeholder.svg",
      votes: item.upvoteCount || 0,
      duration: "3:30",
      userVote: userUpvotes.has(item.streamId || item.id) ? "up" : null,
      addedBy: item.addedBy?.name || "Unknown User",
    })) || []

  // Transform WebSocket messages to match component interface
  const chatMessages =
    messages?.map((msg: any) => ({
      id: msg.id || `msg-${Date.now()}`,
      user: msg.sender || "Unknown User",
      message: msg.text || msg.message || "",
      avatar: (msg.sender || "U").charAt(0).toUpperCase(),
      time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    })) || []

  // Current video from WebSocket nowPlaying
  const currentVideo = nowPlaying
    ? {
        id: nowPlaying.extractedId || "",
        title: nowPlaying.title || "No video playing",
        channel: "YouTube",
        views: "N/A",
        likes: "N/A",
        publishedAt: "N/A",
      }
    : {
        id: "",
        title: "No video playing",
        channel: "",
        views: "",
        likes: "",
        publishedAt: "",
      }

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user) {
      router.push("/")
    }
  }, [session, status, router])

  if (status === "loading" || !session?.user) return null

  const handleVote = (id: string, voteType: "up" | "down" | null) => {
    if (voteType === "up") {
      upvoteSong(id, userId)
    }
  }

  const handleAddYoutubeUrl = async () => {
    if (!youtubeUrl) return
    if (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be")) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      })
      return
    }

    try {
      // Use your existing streams endpoint
      const response = await axios.post("/api/streams", {
        url: youtubeUrl,
      })

      if (response.status === 200) {
        const songData = {
          extractedId: response.data.id,
          title: response.data.title,
          bigImg: response.data.bigImg,
          url: youtubeUrl,
          roomId: roomData.room.id,
          addedById: userId,
        }

        addSong(songData)
        setYoutubeUrl("")

        toast({
          title: "Video added to queue",
          description: "Your video has been added to the queue",
        })
      }
    } catch (error) {
      console.error("Error adding video:", error)
      toast({
        title: "Error adding video",
        description: "Failed to add video to queue",
        variant: "destructive",
      })
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return

    try {
      // Use your existing youtube-search endpoint
      const response = await axios.get(`/api/youtube-search?q=${encodeURIComponent(searchQuery)}`)

      if (response.status === 200) {
        setSearchResults(response.data.items)
        toast({
          title: "Search completed",
          description: `Found ${response.data.items.length} videos`,
        })
      }
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Search failed",
        description: "Failed to search for videos",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage || chatPaused) return

    sendMessage(newMessage, userDets?.user?.email || session?.user?.name)
    setNewMessage("")
  }

  const sortedQueueItems = [...queueItems].sort((a, b) => b.votes - a.votes)

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomInfo.id)
    toast({
      title: "Room ID copied",
      description: "Room ID has been copied to clipboard",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-80 bg-background border-r border-border overflow-y-auto">
              <SidebarContent
                roomInfo={roomInfo}
                youtubeUrl={youtubeUrl}
                setYoutubeUrl={setYoutubeUrl}
                handleAddYoutubeUrl={handleAddYoutubeUrl}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                searchResults={searchResults}
                isMobile={true}
                closeMobileMenu={() => setMobileMenuOpen(false)}
                copyRoomId={copyRoomId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block border-r border-border h-screen overflow-y-auto"
            >
              <SidebarContent
                roomInfo={roomInfo}
                youtubeUrl={youtubeUrl}
                setYoutubeUrl={setYoutubeUrl}
                handleAddYoutubeUrl={handleAddYoutubeUrl}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                searchResults={searchResults}
                copyRoomId={copyRoomId}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="border-b border-border p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex"
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>
              <h1 className="text-xl font-bold">StreamSync Dashboard</h1>
              <Badge variant="outline" className="ml-2">
                <Users className="h-3 w-3 mr-1" />
                {roomInfo.activeUsers} active
              </Badge>
              {roomInfo.isAdmin && (
                <Badge variant="secondary" className="ml-2">
                  Admin
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDesignMode(designMode === "modern" ? "alternative" : "modern")}
                aria-label="Toggle design"
              >
                {designMode === "modern" ? <LayoutGrid className="h-5 w-5" /> : <LayoutList className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <ProfileHover />
            </div>
          </header>

          {/* Content area */}
          {designMode === "modern" ? (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
              <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
                <VideoPlayer currentVideo={currentVideo} />
                <Queue queueItems={sortedQueueItems} handleVote={handleVote} />
              </div>
              <Chat
                chatMessages={chatMessages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                isAdmin={roomInfo.isAdmin}
              />
            </div>
          ) : (
            <AlternativeDesign
              currentVideo={currentVideo}
              roomInfo={roomInfo}
              youtubeUrl={youtubeUrl}
              setYoutubeUrl={setYoutubeUrl}
              handleAddYoutubeUrl={handleAddYoutubeUrl}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              queueItems={sortedQueueItems}
              handleVote={handleVote}
              chatMessages={chatMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          )}
        </main>
      </div>
    </div>
  )
}
