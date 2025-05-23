"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Plus, Search, Music, Clipboard, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TrendingVideos from "./trending-videos"
import HistoryVideos from "./history-videos"

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
  copyRoomId: () => void
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
  copyRoomId,
}: SidebarProps) {
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
          <Button onClick={handleAddYoutubeUrl}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Search YouTube</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Tabs for different content */}
      <Tabs defaultValue="trending">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="trending" className="space-y-2 mt-2">
          <TrendingVideos />
        </TabsContent>
        <TabsContent value="history" className="space-y-2 mt-2">
          <HistoryVideos />
        </TabsContent>
      </Tabs>

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
