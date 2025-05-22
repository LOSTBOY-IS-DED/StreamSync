"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TagProps {
  children: ReactNode
}

export default function Tag({ children }: TagProps) {
  return (
    <motion.div
      className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-neutral-950 font-semibold text-sm md:text-base"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
