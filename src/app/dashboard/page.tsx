"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import VideoPlayer from "@/components/dashboard/video-player"
import Queue from "@/components/dashboard/queue"
import Chat from "@/components/dashboard/chat"
import { roomInfo, currentVideo, initialQueueItems, initialChatMessages } from "@/lib/mock-data"
import type { QueueItem, ChatMessage } from "@/lib/types"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [queueItems, setQueueItems] = useState<QueueItem[]>(initialQueueItems)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const { theme, setTheme } = useTheme()

  // Handle voting
  const handleVote = (id: string, voteType: "up" | "down" | null) => {
    setQueueItems(
      queueItems.map((item) => {
        if (item.id === id) {
          // If user is removing their vote
          if (item.userVote === voteType) {
            return {
              ...item,
              votes: voteType === "up" ? item.votes - 1 : item.votes + 1,
              userVote: null,
            }
          }
          // If user is changing their vote
          else if (item.userVote !== null) {
            return {
              ...item,
              votes: voteType === "up" ? item.votes + 2 : item.votes - 2,
              userVote: voteType,
            }
          }
          // If user is voting for the first time
          else {
            return {
              ...item,
              votes: voteType === "up" ? item.votes + 1 : item.votes - 1,
              userVote: voteType,
            }
          }
        }
        return item
      }),
    )
  }

  // Handle adding a YouTube URL
  const handleAddYoutubeUrl = () => {
    if (!youtubeUrl) return

    // Simple validation for YouTube URL
    if (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be")) {
      toast.error("Invalid YouTube URL", {
        description: "Please enter a valid YouTube URL",
      })
      return
    }

    // In a real app, you would fetch video details from the YouTube API
    // For this demo, we'll just add a mock item
    const newItem: QueueItem = {
      id: `new-${Date.now()}`,
      title: "New Added Video",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      votes: 1,
      duration: "3:30",
      userVote: "up",
      addedBy: "You",
    }

    setQueueItems([...queueItems, newItem])
    setYoutubeUrl("")

    toast.success("Video added to queue", {
      description: "Your video has been added to the queue",
    })
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return

    toast.info("Searching for videos", {
      description: `Searching for "${searchQuery}"`,
    })

    // In a real app, you would search the YouTube API
    setSearchQuery("")
  }

  // Handle sending a chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage) return

    const newChatMessage: ChatMessage = {
      id: `new-${Date.now()}`,
      user: "You",
      message: newMessage,
      avatar: "Y",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newChatMessage])
    setNewMessage("")
  }

  // Copy room ID to clipboard
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomInfo.id)
    toast.success("Room ID copied", {
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
              <Sidebar
                roomInfo={roomInfo}
                youtubeUrl={youtubeUrl}
                setYoutubeUrl={setYoutubeUrl}
                handleAddYoutubeUrl={handleAddYoutubeUrl}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
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
              <Sidebar
                roomInfo={roomInfo}
                youtubeUrl={youtubeUrl}
                setYoutubeUrl={setYoutubeUrl}
                handleAddYoutubeUrl={handleAddYoutubeUrl}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                copyRoomId={copyRoomId}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <Header roomInfo={roomInfo} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Alternative Design */}
          <div className="flex-1 flex flex-col gap-6 p-6 overflow-hidden">
            {/* Hero section with video player */}
            <VideoPlayer
              currentVideo={currentVideo}
              roomInfo={roomInfo}
              youtubeUrl={youtubeUrl}
              setYoutubeUrl={setYoutubeUrl}
              handleAddYoutubeUrl={handleAddYoutubeUrl}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />

            {/* Queue and Chat sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Queue */}
              <Queue queueItems={queueItems} handleVote={handleVote} />

              {/* Chat */}
              <Chat
                chatMessages={chatMessages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
