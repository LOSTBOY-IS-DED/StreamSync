"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ThumbsUp, ThumbsDown, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface QueueProps {
  queueItems: {
    id: string
    title: string
    thumbnail: string
    votes: number
    duration: string
    userVote: "up" | "down" | null
    addedBy: string
  }[]
  handleVote: (id: string, voteType: "up" | "down" | null) => void
}

export function Queue({ queueItems, handleVote }: QueueProps) {
  return (
    <div className="flex-1 bg-card rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">Up Next</h2>
        <Badge variant="secondary">{queueItems.length} songs</Badge>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence initial={false}>
          {queueItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0 w-24 h-16 relative rounded-md overflow-hidden">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {item.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>Added by {item.addedBy}</span>
                  <span>•</span>
                  <span>{item.votes} votes</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", item.userVote === "up" && "text-green-500 bg-green-500/10")}
                  onClick={() => handleVote(item.id, item.userVote === "up" ? null : "up")}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", item.userVote === "down" && "text-red-500 bg-red-500/10")}
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
    </div>
  )
}
