"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { QueueItem } from "@/lib/types"
import Image from "next/image"

interface QueueProps {
  queueItems: QueueItem[]
  handleVote: (id: string, voteType: "up" | "down" | null) => void
}

export default function Queue({ queueItems, handleVote }: QueueProps) {
  const sortedQueueItems = [...queueItems].sort((a, b) => b.votes - a.votes)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="lg:col-span-2 bg-card rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <h2 className="font-bold text-lg">Up Next</h2>
        <Badge variant="secondary" className="bg-white/10">
          {queueItems.length} songs
        </Badge>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {sortedQueueItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex gap-4 p-3 mb-3 rounded-xl bg-gradient-to-r from-background to-background/50 hover:from-purple-900/10 hover:to-pink-900/10 transition-colors border border-border"
            >
              <div className="flex-shrink-0 w-28 h-20 relative rounded-lg overflow-hidden">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  width={112}
                  height={80}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {item.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>Added by {item.addedBy}</span>
                  <span>•</span>
                  <span>{item.votes} votes</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-9 w-9 rounded-full", item.userVote === "up" && "text-green-500 bg-green-500/10")}
                  onClick={() => handleVote(item.id, item.userVote === "up" ? null : "up")}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-9 w-9 rounded-full", item.userVote === "down" && "text-red-500 bg-red-500/10")}
                  onClick={() => handleVote(item.id, item.userVote === "down" ? null : "down")}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {queueItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
            <Music className="h-12 w-12 mb-4 opacity-20" />
            <p>No songs in queue</p>
            <p className="text-sm mt-1">Add a YouTube URL to get started</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
