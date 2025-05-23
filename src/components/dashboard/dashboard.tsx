"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Menu, X, Users, Moon, Sun, LayoutGrid, LayoutList } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { SidebarContent } from "@/components/dashboard/sidebar-content"
import { VideoPlayer } from "@/components/dashboard/video-player"
import { Queue } from "@/components/dashboard/queue"
import { Chat } from "@/components/dashboard/chat"
import { AlternativeDesign } from "./alternative-design"
import { initialQueueItems, initialChatMessages, currentVideo, roomInfo } from "@/components/dashboard/data"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [queueItems, setQueueItems] = useState(initialQueueItems)
  const [chatMessages, setChatMessages] = useState(initialChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [designMode, setDesignMode] = useState<"modern" | "alternative">("modern")

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
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would fetch video details from the YouTube API
    // For this demo, we'll just add a mock item
    const newItem = {
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

    toast({
      title: "Video added to queue",
      description: "Your video has been added to the queue",
    })
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return

    toast({
      title: "Searching for videos",
      description: `Searching for "${searchQuery}"`,
    })

    // In a real app, you would search the YouTube API
    setSearchQuery("")
  }

  // Handle sending a chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage) return

    const newChatMessage = {
      id: `new-${Date.now()}`,
      user: "You",
      message: newMessage,
      avatar: "Y",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newChatMessage])
    setNewMessage("")
  }

  // Sort queue items by votes
  const sortedQueueItems = [...queueItems].sort((a, b) => b.votes - a.votes)

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomInfo.id)
    toast({
      title: "Room ID copied",
      description: "Room ID has been copied to clipboard",
    })
  }

  return (
    <div className={`min-h-screen flex flex-col`}>
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
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Content area */}
          {designMode === "modern" ? (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
              {/* Video player and queue */}
              <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
                <VideoPlayer currentVideo={currentVideo} />
                <Queue queueItems={sortedQueueItems} handleVote={handleVote} />
              </div>

              {/* Chat */}
              <Chat
                chatMessages={chatMessages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
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
