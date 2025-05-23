"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VideoPlayerProps {
  currentVideo: {
    id: string
    title: string
    channel: string
    views: string
    likes: string
    publishedAt: string
  }
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
}

export default function VideoPlayer({
  currentVideo,
  roomInfo,
  youtubeUrl,
  setYoutubeUrl,
  handleAddYoutubeUrl,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: VideoPlayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl overflow-hidden bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm"
    >
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="lg:w-2/3 rounded-xl overflow-hidden bg-black aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="lg:w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">{currentVideo.title}</h2>
            <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
              <span>{currentVideo.channel}</span>
              <span>•</span>
              <span>{currentVideo.views}</span>
            </div>
            <p className="mt-4 text-white/80">
              Currently playing in {roomInfo.name}. Add songs to the queue or vote for your favorites!
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                placeholder="Paste YouTube URL..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="bg-white/10 border-white/20"
              />
              <Button
                onClick={handleAddYoutubeUrl}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search for videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20"
              />
              <Button type="submit" variant="outline" className="border-white/20">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
