"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Tag from "./ui/tag"
import FeatureCard3D from "./ui/feature-card-3d"
import SpeedIndicator from "./speed-indicator"
import SyncAnimation from "./sync-animation"
import ScalabilityChart from "./scalability-chart"
import FloatingIcon from "./ui/floating-icon"

const features = [
  "Private & Public Rooms",
  "YouTube + Spotify Support",
  "Smart Queue System",
  "Live Chat",
  "Host Controls",
  "Minimal UI, Maximum Focus",
  "Device-Responsive",
]

export default function Features3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section className="py-32 relative overflow-hidden perspective-1000" ref={sectionRef}>
      {/* Floating background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y1, opacity: opacity1 }}>
        <FloatingIcon className="top-1/4 left-[15%]" delay={0.2} duration={4}>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-purple-500/10 backdrop-blur-sm flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18V5L21 3V16"
                stroke="rgba(139, 92, 246, 0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1.5" />
              <circle cx="18" cy="16" r="3" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1.5" />
            </svg>
          </div>
        </FloatingIcon>

        <FloatingIcon className="top-1/3 right-[10%]" delay={0.5} duration={5}>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-pink-500/10 backdrop-blur-sm flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="rgba(236, 72, 153, 0.5)"
                strokeWidth="1.5"
              />
              <path d="M9.5 8.5L16.5 12L9.5 15.5V8.5Z" stroke="rgba(236, 72, 153, 0.5)" strokeWidth="1.5" />
            </svg>
          </div>
        </FloatingIcon>

        <FloatingIcon className="bottom-1/4 left-[20%]" delay={0.8} duration={4.5}>
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-500/10 backdrop-blur-sm flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </FloatingIcon>
      </motion.div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-black pointer-events-none"></div>

      {/* Main content */}
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-center">
          <Tag>Features</Tag>
        </div>
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-medium text-center mt-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Where social meets{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">streaming</span>
        </motion.h2>

        {/* Card grid with improved spacing */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          <div className="w-full">
            <FeatureCard3D
              title="Blazing Fast Streaming"
              description="Experience lightning-fast playback with zero lag. Whether it's music or video, enjoy smooth streaming that starts instantly, every single time."
              glowColor="rgba(139, 92, 246, 0.2)"
            >
              <div className="aspect-video flex items-center justify-center h-48">
                <SpeedIndicator />
              </div>
            </FeatureCard3D>
          </div>

          <div className="w-full">
            <FeatureCard3D
              title="Real-Time Sync"
              description="Stay perfectly in sync with your friends—every play, pause, and skip happens together. It's like being in the same room, no matter where you are."
              glowColor="rgba(236, 72, 153, 0.2)"
            >
              <div className="aspect-video flex items-center justify-center h-48">
                <SyncAnimation />
              </div>
            </FeatureCard3D>
          </div>

          <div className="w-full">
            <FeatureCard3D
              title="Effortless Scalability"
              description="From a hangout of 2 to a party of 200, the platform scales seamlessly so everyone enjoys the same high-quality experience, no matter the size."
              glowColor="rgba(59, 130, 246, 0.2)"
            >
              <div className="aspect-video flex items-center justify-center h-48">
                <ScalabilityChart />
              </div>
            </FeatureCard3D>
          </div>
        </div>

        <motion.div
          className="mt-16 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              className="bg-black/30 backdrop-blur-xl border border-white/10 inline-flex px-4 md:px-6 py-2 md:py-3 rounded-2xl gap-3 items-center hover:scale-105 transition duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
              }}
            >
              <motion.span
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white size-6 rounded-full inline-flex justify-center items-center text-xs font-bold"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
              <span className="font-medium md:text-lg">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
