"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { twMerge } from "tailwind-merge"

export default function Introduction() {
  const scrollTarget = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ["start end", "end end"] })

  // The text content split into sentences for better visual structure
  const sentences = [
    "Watch videos, play music, and vibe together—no matter where you are.",
    "Create private rooms, sync playback, build queues, chat live, and control every moment with friends in real time.",
  ]

  // Join sentences and split into words for the animation
  const text = sentences.join(" ")
  const words = text.split(" ")

  // For highlighting the word use transform hook
  const [currentWord, setCurrentWord] = useState(0)
  const wordIndex = useTransform(scrollYProgress, [0, 0.8], [0, words.length])

  useEffect(() => {
    wordIndex.on("change", (latest) => {
      setCurrentWord(latest)
    })
  }, [wordIndex])

  // Debug scroll progress (optional)
  useMotionValueEvent(scrollYProgress, "change", (latest) => console.log("scroll progress:", latest))

  return (
    <section className="py-28 lg:py-40 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-purple-950/10 pointer-events-none"></div>

      <div className="container max-w-5xl mx-auto px-4">
        <div className="sticky top-20 md:top-28 lg:top-40">
          <div className="flex justify-center">
            <div className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-neutral-950 font-semibold text-sm md:text-base">
              StreamSync Experience
            </div>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-center mt-8 md:mt-10">
            <div className="mb-6 md:mb-8 lg:mb-10 pb-2">
              {words.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={twMerge("transition duration-500 text-white/15", wordIndex < currentWord && "text-white")}
                >
                  {`${word} `}
                </span>
              ))}
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent inline-block pb-4 px-2">
              Experience the future of social streaming.
            </div>
          </div>
        </div>
        <div className="h-[150vh]" ref={scrollTarget}></div>
      </div>

      {/* Subtle gradient orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full bg-pink-500/5 blur-[100px] pointer-events-none"></div>
    </section>
  )
}
