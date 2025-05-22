"use client"

import { motion } from "framer-motion"

interface PointerProps {
  name: string
  color?: string
}

export default function Pointer({ name, color = "purple" }: PointerProps) {
  const colorClasses = {
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
  }

  const bgColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.purple

  return (
    <motion.div
      className="flex items-center gap-2 pointer-events-none"
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
    >
      <div className={`w-3 h-3 rounded-full ${bgColor}`} />
      <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs border border-white/10">{name}</div>
    </motion.div>
  )
}
