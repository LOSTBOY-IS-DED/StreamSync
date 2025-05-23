"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, ThumbsUp, ThumbsDown, Music, MessageSquare, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface AlternativeDesignProps {
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
  queueItems: {
    id: string
    title: string
    thumbnail: string
    votes: number
    duration: string
    userVote: "up" | "down" | null
    addedBy: string
  }[]
  handleVote: (id: string, voteType: "up" | "down" | null) => void
  chatMessages: {
    id: string
    user: string
    message: string
    avatar: string
    time: string
  }[]
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
}

export function AlternativeDesign({
  currentVideo,
  roomInfo,
  youtubeUrl,
  setYoutubeUrl,
  handleAddYoutubeUrl,
  searchQuery,
  setSearchQuery,
  handleSearch,
  queueItems,
  handleVote,
  chatMessages,
  newMessage,
  setNewMessage,
  handleSendMessage,
}: AlternativeDesignProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 p-6 overflow-hidden">
      {/* Hero section with video player */}
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

      {/* Queue and Chat sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-card rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h2 className="font-bold text-lg">Up Next</h2>
            <Badge variant="secondary" className="bg-white/10">
              {queueItems.length} songs
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence initial={false}>
              {queueItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex gap-4 p-3 mb-3 rounded-xl bg-gradient-to-r from-background to-background/50 hover:from-purple-900/10 hover:to-pink-900/10 transition-colors border border-border"
                >
                  <div className="flex-shrink-0 w-28 h-20 relative rounded-lg overflow-hidden">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      width={224}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {item.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>Added by {item.addedBy}</span>
                      <span>•</span>
                      <span>{item.votes} votes</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn("h-9 w-9 rounded-full", item.userVote === "up" && "text-green-500 bg-green-500/10")}
                      onClick={() => handleVote(item.id, item.userVote === "up" ? null : "up")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn("h-9 w-9 rounded-full", item.userVote === "down" && "text-red-500 bg-red-500/10")}
                      onClick={() => handleVote(item.id, item.userVote === "down" ? null : "down")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {queueItems.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
                <Music className="h-12 w-12 mb-4 opacity-20" />
                <p>No songs in queue</p>
                <p className="text-sm mt-1">Add a YouTube URL to get started</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-border bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h2 className="font-bold text-lg">Live Chat</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {chatMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex gap-3"
                >
                  <Avatar className="h-8 w-8 border-2 border-purple-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      {message.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{message.user}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm mt-1 bg-gradient-to-r from-background to-background/50 p-2 rounded-lg border border-border">
                      {message.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {chatMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                <p>No messages yet</p>
                <p className="text-sm mt-1">Be the first to say hello!</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-background/50"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
