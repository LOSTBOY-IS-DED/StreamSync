"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SpeedIndicator() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Speed gauge background */}
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: isActive ? 50 : 283 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? 1 : 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            0ms
          </motion.div>
          <motion.div
            className="text-xs text-white/60 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 1.5 }}
          >
            latency
          </motion.div>
        </div>

        {/* Speed lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{
              height: 12 + i * 2,
              left: `${20 + i * 8}%`,
              top: "20%",
              transformOrigin: "center bottom",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>

      {/* Lightning bolt */}
      <motion.div
        className="absolute top-4 right-4"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: isActive ? 1 : 0, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#lightningGradient)" />
          <defs>
            <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
}
