"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ScalabilityChart() {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const userCounts = [2, 10, 50, 100, 200]
  const barHeights = [20, 40, 60, 80, 100]

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-full max-w-xs">
        {/* Chart bars */}
        <div className="flex items-end justify-between h-32 mb-4">
          {userCounts.map((count, index) => (
            <div key={count} className="flex flex-col items-center gap-2">
              <motion.div
                className="w-8 md:w-10 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? barHeights[index] : 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: isAnimating ? "100%" : "-100%" }}
                  transition={{
                    duration: 1.5,
                    delay: 1 + index * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>
              <motion.span
                className="text-xs text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: isAnimating ? 1 : 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                {count}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Performance indicator */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isAnimating ? 1 : 0, y: isAnimating ? 0 : 20 }}
          transition={{ delay: 2 }}
        >
          <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            99.9% Uptime
          </div>
          <div className="text-xs text-white/60">Seamless scaling</div>
        </motion.div>

        {/* Floating user icons */}
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 60 + 20}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 2.5 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
