"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Users, Plus, ArrowRight, Copy, Check, Sparkles, Play, Volume2, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfileHover } from "@/components/ui/profile-card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function RoomPage() {
  // const { data: session } = useSession()
  const session = {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: null,
    },
  } // Mock session for now

  const [mode, setMode] = useState<"join" | "create">("join")
  const [roomId, setRoomId] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Pre-generated room ID for create mode
  const generatedRoomId = "stream-sync-" + Math.random().toString(36).substr(2, 9)

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(generatedRoomId)
      setCopied(true)
      toast.success("Room ID copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy room ID")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (mode === "create") {
        toast.success("Room created successfully!")
        // Redirect to dashboard with the generated room ID
        window.location.href = `/dashboard?room=${generatedRoomId}`
      } else {
        if (roomId.trim()) {
          toast.success("Joining room...")
          // Redirect to dashboard with the entered room ID
          window.location.href = `/dashboard?room=${roomId}`
        } else {
          toast.error("Please enter a room ID")
        }
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...")
  }

  const userName = session?.user?.name || "User"

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl"
        />
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 100,
              x: Math.random() * window.innerWidth,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: -100,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: "easeOut",
            }}
            className="absolute"
          >
            <Music className="w-6 h-6 text-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Profile Avatar - Top Right */}
        <div className="absolute top-8 right-8 z-20">
          <ProfileHover user={session?.user} onLogout={handleLogout} />
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-4xl">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-2xl"
              >
                <Radio className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold text-white mb-4"
              >
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {userName}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-white/80 max-w-2xl mx-auto"
              >
                Ready to sync your music experience? Join an existing room or create your own musical journey.
              </motion.p>
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  {/* Mode Toggle */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-white/10 p-1 rounded-xl backdrop-blur-sm">
                      <div className="flex">
                        <Button
                          variant={mode === "join" ? "default" : "ghost"}
                          onClick={() => setMode("join")}
                          className={cn(
                            "px-6 py-3 rounded-lg transition-all duration-300",
                            mode === "join"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                              : "text-white/70 hover:text-white hover:bg-white/10",
                          )}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Join Room
                        </Button>
                        <Button
                          variant={mode === "create" ? "default" : "ghost"}
                          onClick={() => setMode("create")}
                          className={cn(
                            "px-6 py-3 rounded-lg transition-all duration-300",
                            mode === "create"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                              : "text-white/70 hover:text-white hover:bg-white/10",
                          )}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Room
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content based on mode */}
                  <AnimatePresence mode="wait">
                    {mode === "join" ? (
                      <motion.div
                        key="join"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center">
                          <h2 className="text-2xl font-bold text-white mb-2">Join a Room</h2>
                          <p className="text-white/70">Enter the room ID to join an existing music session</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Input
                              placeholder="Enter room ID (e.g., stream-sync-abc123)"
                              value={roomId}
                              onChange={(e) => setRoomId(e.target.value)}
                              className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              <>
                                <Play className="w-5 h-5 mr-2" />
                                Join Room
                                <ArrowRight className="w-5 h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="create"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center">
                          <h2 className="text-2xl font-bold text-white mb-2">Create a Room</h2>
                          <p className="text-white/70">Start your own music session and invite friends</p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-white/70">Your Room ID:</span>
                            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Generated
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-white/10 rounded-lg p-3 font-mono text-white">
                              {generatedRoomId}
                            </div>
                            <Button
                              onClick={handleCopyRoomId}
                              variant="outline"
                              size="icon"
                              className="h-12 w-12 border-white/20 hover:bg-white/10"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-white" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              <>
                                <Plus className="w-5 h-5 mr-2" />
                                Create Room
                                <ArrowRight className="w-5 h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Features Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-12 pt-8 border-t border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Volume2 className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-1">Real-time Sync</h3>
                        <p className="text-white/60 text-sm">Listen together in perfect harmony</p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-1">Collaborative Queue</h3>
                        <p className="text-white/60 text-sm">Vote and add songs together</p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Music className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-1">YouTube Integration</h3>
                        <p className="text-white/60 text-sm">Stream any YouTube video</p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
