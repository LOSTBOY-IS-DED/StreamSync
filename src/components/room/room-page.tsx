/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"; 

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import {
  Music,
  Users,
  Plus,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Play,
  Volume2,
  Radio,
  Star,
  Zap,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfileHover } from "@/components/ui/profile-card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


export function RoomPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
    }, [status, router])


  const [mode, setMode] = useState<"join" | "create">("join")
  const [roomId, setRoomId] = useState("")
  const [createRoomId, setCreateRoomId] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const generateRoomId = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let roomId = "";
    for (let i = 0; i < 9; i++) {
      if (i > 0 && i % 3 === 0) {
        roomId += "-";
      }
      roomId += characters[Math.floor(Math.random() * characters.length)];
    }
    return roomId;
  };

  const formatRoomId = (input: string) => {
    const cleanInput = input.replace(/-/g, "").slice(0, 9);
    return cleanInput.match(/.{1,3}/g)?.join("-") || "";
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCopyRoomId = async () => {
    if (!createRoomId) {
      toast.error("No room ID to copy")
      return
    }
    try {
      await navigator.clipboard.writeText(createRoomId)
      setCopied(true)
      toast.success("Room ID copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy room ID")
    }
  }

  const handleQuickGenerate = () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
    toast.success("Room ID generated!");
  }

  const handleGenerateCreateRoomId = () => {
    const newRoomId = generateRoomId();
    setCreateRoomId(newRoomId);
    toast.success("Room ID generated!");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === "create") {
        if (createRoomId.trim()) {
          const res = await axios.post("/api/room/create", {
            roomId: createRoomId,
          });
          if (!res) {
            console.log("Error while creating room");
            toast.error("Failed to create room");
            setIsLoading(false);
            return;
          }
          toast.success("Room created successfully!")
          window.location.href = `/dashboard?room=${createRoomId}`
        } else {
          toast.error("Please generate a room ID")
          setIsLoading(false)
        }
      } else {
        if (roomId.trim()) {
          toast.success("Joining room...")
          window.location.href = `/dashboard?room=${roomId}`
        } else {
          toast.error("Please enter a room ID")
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const userName = session?.user?.name || "User"

  // Animation variants for directional entries
  const topVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const bottomVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const leftVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  const rightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  const scaleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Enhanced Background Elements - Non-overlapping */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left Gradient */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-indigo-600/10 rounded-full blur-3xl"
        />

        {/* Top Right Gradient */}
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-bl from-purple-700/15 to-pink-600/10 rounded-full blur-3xl"
        />

        {/* Bottom Left Gradient */}
        <motion.div
          animate={{
            rotate: [0, -360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-tr from-indigo-700/15 to-purple-600/10 rounded-full blur-3xl"
        />

        {/* Bottom Right Gradient */}
        <motion.div
          animate={{
            rotate: [-360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-purple-800/20 to-indigo-700/10 rounded-full blur-3xl"
        />

        {/* Center Floating Element */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-purple-600/5 to-indigo-600/5 rounded-full blur-2xl"
        />
      </div>

      {/* Directional Floating Icons - Non-overlapping zones */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Zone Icons */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`top-${i}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2,
            }}
            className="absolute top-10"
            style={{
              left: `${20 + i * 25}%`,
            }}
          >
            <Music className="w-5 h-5 text-purple-400/30" />
          </motion.div>
        ))}

        {/* Right Zone Icons */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            initial={{ x: 50, opacity: 0 }}
            animate={{
              x: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, -360],
            }}
            transition={{
              duration: 7 + i * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className="absolute right-10"
            style={{
              top: `${25 + i * 20}%`,
            }}
          >
            <Star className="w-4 h-4 text-indigo-400/30" />
          </motion.div>
        ))}

        {/* Bottom Zone Icons */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180],
            }}
            transition={{
              duration: 8 + i * 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2.5,
            }}
            className="absolute bottom-10"
            style={{
              left: `${30 + i * 20}%`,
            }}
          >
            <Zap className="w-4 h-4 text-purple-300/30" />
          </motion.div>
        ))}

        {/* Left Zone Icons */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 3,
            }}
            className="absolute left-10"
            style={{
              top: `${30 + i * 25}%`,
            }}
          >
            <Heart className="w-4 h-4 text-pink-400/30" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Profile Avatar - Top Right */}
        <motion.div
          variants={topVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20"
        >
          <ProfileHover/>
        </motion.div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-4xl">
            {/* Header Section */}
            <motion.div
              variants={topVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-8 sm:mb-12"
            >
              <motion.div
                variants={scaleVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 sm:mb-6 shadow-2xl"
              >
                <Radio className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>

              <motion.h1
                variants={bottomVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4"
              >
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {userName}
                </span>
              </motion.h1>

              <motion.p
                variants={bottomVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto px-4"
              >
                Ready to sync your music experience? Join an existing room or create your own musical journey.
              </motion.p>
            </motion.div>

            {/* Main Card */}
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-gray-900/80 backdrop-blur-xl border-purple-500/20 shadow-2xl">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  {/* Mode Toggle - Removed the old quick generate button */}
                  <motion.div
                    variants={leftVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex justify-center mb-6 sm:mb-8"
                  >
                    <div className="bg-gray-800/50 p-1 rounded-xl backdrop-blur-sm border border-purple-500/20">
                      <div className="flex items-center">
                        <Button
                          variant={mode === "join" ? "default" : "ghost"}
                          onClick={() => setMode("join")}
                          className={cn(
                            "px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base",
                            mode === "join"
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
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
                            "px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base",
                            mode === "create"
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                              : "text-white/70 hover:text-white hover:bg-white/10",
                          )}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Room
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content based on mode */}
                  <AnimatePresence mode="wait">
                    {mode === "join" ? (
                      <motion.div
                        key="join"
                        variants={rightVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="text-center">
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Join a Room</h2>
                          <p className="text-white/70 text-sm sm:text-base">
                            Enter the room ID to join an existing music session
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <Input
                              placeholder="Enter or generate room ID (e.g., abc-def-ghi)"
                              value={roomId}
                              onChange={(e) => setRoomId(formatRoomId(e.target.value))}
                              className="h-12 sm:h-14 text-base sm:text-lg bg-gray-800/50 border-purple-500/30 text-white placeholder:text-white/50 focus:border-purple-400"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              <>
                                <Play className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                                Join Room
                                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="create"
                        variants={leftVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="text-center">
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Create a Room</h2>
                          <p className="text-white/70 text-sm sm:text-base">
                            Start your own music session and invite friends
                          </p>
                        </div>

                        <div className="bg-gray-800/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-white/70 text-sm sm:text-base">Your Room ID:</span>
                            {createRoomId && (
                              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 text-xs sm:text-sm">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Generated
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="flex-1 bg-gray-800/50 rounded-lg p-3 font-mono text-white text-sm sm:text-base break-all min-h-[48px] flex items-center">
                              {createRoomId || (
                                <span className="text-white/50 text-sm">
                                  Click the + button to generate a room ID
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={handleGenerateCreateRoomId}
                                variant="outline"
                                size="icon"
                                className="h-12 w-12 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300 group"
                              >
                                <Plus className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                              </Button>
                              <Button
                                onClick={handleCopyRoomId}
                                variant="outline"
                                size="icon"
                                disabled={!createRoomId}
                                className="h-12 w-12 border-purple-500/30 hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {copied ? (
                                  <Check className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Copy className="w-4 h-4 text-white" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                          <Button
                            type="submit"
                            disabled={isLoading || !createRoomId}
                            className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                            ) : (
                              <>
                                <Plus className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                                Create Room
                                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Features Section */}
                  <motion.div
                    variants={bottomVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-purple-500/20"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 border border-purple-500/20"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Real-time Sync</h3>
                        <p className="text-white/60 text-xs sm:text-sm">Listen together in perfect harmony</p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-center p-4 rounded-xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Collaborative Queue</h3>
                        <p className="text-white/60 text-xs sm:text-sm">Vote and add songs together</p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 sm:col-span-2 lg:col-span-1"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Music className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">YouTube Integration</h3>
                        <p className="text-white/60 text-xs sm:text-sm">Stream any YouTube video</p>
                      </motion.div>
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