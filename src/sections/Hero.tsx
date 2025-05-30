"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Plus, Music, Video, MessageCircle, Zap, Users, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import StaggeredText from "@/components/ui/StaggeredText"

export default function HeroDynamic() {
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-12 md:py-16 lg:py-24 overflow-hidden relative">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Flying elements from sides - hidden on very small screens */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block overflow-hidden">
          {/* YouTube icon from left */}
          <motion.div
            className="absolute left-0 top-1/4"
            initial={{ x: -100, opacity: 0, rotate: -20 }}
            animate={{ x: 20, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
            </div>
          </motion.div>

          {/* Spotify icon from right */}
          <motion.div
            className="absolute right-0 top-1/3"
            initial={{ x: 100, opacity: 0, rotate: 20 }}
            animate={{ x: 30, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
            </div>
          </motion.div>

          {/* Chat icon from bottom */}
          <motion.div
            className="absolute left-1/4 bottom-0"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 30, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            </div>
          </motion.div>

          {/* Users icon from top right */}
          <motion.div
            className="absolute right-1/4 top-0"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
            </div>
          </motion.div>

          {/* Zap icon from left bottom - repositioned to avoid overlap */}
          <motion.div
            className="absolute left-1/3 bottom-1/3"
            initial={{ x: -100, y: 100, opacity: 0, rotate: -45 }}
            animate={{ x: 40, y: -40, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            </div>
          </motion.div>

          {/* Sparkles from right bottom - repositioned to avoid overlap */}
          <motion.div
            className="absolute right-1/3 bottom-2/5"
            initial={{ x: 100, y: 100, opacity: 0, rotate: 45 }}
            animate={{ x: -30, y: -30, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
            </div>
          </motion.div>
        </div>

        {/* Floating music notes - fewer on mobile */}
        {showParticles && (
          <div className="hidden sm:block">
            {Array.from({ length: 10 }).map((_, i) => {
              const size = Math.random() * 8 + 4
              const initialX = Math.random() * 100 - 50
              const initialY = Math.random() * 50 + 50
              const duration = Math.random() * 10 + 15
              const delay = Math.random() * 5

              return (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none hidden sm:block"
                  style={{
                    left: `calc(50% + ${initialX}%)`,
                    top: `calc(50% + ${initialY}%)`,
                    width: size,
                    height: size,
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: -500,
                    opacity: [0, 0.5, 0],
                    x: Math.sin(i) * 100,
                  }}
                  transition={{
                    duration: duration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: delay,
                    ease: "linear",
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full ${
                      i % 3 === 0 ? "bg-purple-500" : i % 3 === 1 ? "bg-pink-500" : "bg-blue-500"
                    }`}
                  />
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Main content with dramatic entrances */}
        <div className="relative z-10">
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-neutral-950 font-semibold text-sm md:text-base">
              <Plus className="w-4 h-4 mr-1" /> Stream together with friends
            </div>
          </motion.div>

          <div className="mt-6 md:mt-8">
            <StaggeredText
              text="Stream together, vibe forever"
              el="h1"
              className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-center"
              once={true}
            />
          </div>

          {/* Increased spacing between title and description on mobile */}
          <motion.p
            className="text-center text-lg sm:text-lg md:text-xl text-white/70 mt-8 sm:mt-10 md:mt-12 max-w-2xl mx-auto px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Host your own synced streaming party — share YouTube and Spotify, manage the room, chat, and vibe with your
            crew.
          </motion.p>

          {/* Animated wave divider - hidden on very small screens */}
          <div className="relative h-16 md:h-24 my-6 md:my-8 hidden sm:block">
            <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <motion.path
                d="M 0,100 C 200,200 400,0 600,100 C 800,200 1000,0 1200,100 L 1200,200 L 0,200 Z"
                fill="url(#wave-gradient)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.2, pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Email signup with slide-up animation */}
        <motion.div
          className="flex justify-center mt-10 md:mt-12"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex w-full max-w-xs sm:max-w-sm md:max-w-md mx-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-black/50 border-white/10 rounded-l-full rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12 md:h-12 text-base md:text-base"
            />
            <Button className="rounded-r-full rounded-l-none bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12 md:h-12 text-base md:text-base">
              Get Started
            </Button>
          </div>
        </motion.div>

        {/* Feature indicators with staggered entrance */}
        <motion.div
          className="flex justify-center flex-wrap gap-4 md:gap-8 mt-10 md:mt-12 px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-500"></div>
            <span className="text-white/70 text-base md:text-base">YouTube Integration</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500"></div>
            <span className="text-white/70 text-base md:text-base">Spotify Integration</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          >
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-pink-500"></div>
            <span className="text-white/70 text-base md:text-base">Real-time Chat</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
