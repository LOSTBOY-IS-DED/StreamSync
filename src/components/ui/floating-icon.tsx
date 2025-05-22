"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingIconProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FloatingIcon({ children, delay = 0, duration = 3, className = "" }: FloatingIconProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
