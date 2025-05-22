"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface FeatureCard3DProps {
  title: string
  description: string
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function FeatureCard3D({
  title,
  description,
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.15)",
}: FeatureCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring smoothing
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  // Rotate based on mouse position - reduced rotation amount
  const rotateX = useTransform(springY, [-100, 100], [5, -5])
  const rotateY = useTransform(springX, [-100, 100], [-5, 5])

  // Glow effect based on mouse position
  const glowX = useTransform(springX, [-100, 100], [30, 70], { clamp: true })
  const glowY = useTransform(springY, [-100, 100], [30, 70], { clamp: true })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden group ${className}`}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* Card content */}
      <motion.div
        className="relative z-10"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <div className="mb-6">{children}</div>
        <h3 className="text-xl md:text-2xl font-medium mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
          {title}
        </h3>
        <p className="text-white/70">{description}</p>
      </motion.div>
    </motion.div>
  )
}
