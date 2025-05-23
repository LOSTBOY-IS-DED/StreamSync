"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatProps {
  chatMessages: {
    id: string
    user: string
    message: string
    avatar: string
    time: string
  }[]
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
}

export default function Chat({ chatMessages, newMessage, setNewMessage, handleSendMessage }: ChatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className="p-4 border-b border-border bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <h2 className="font-bold text-lg">Live Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {chatMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex gap-3"
            >
              <Avatar className="h-8 w-8 border-2 border-purple-500/30">
                <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  {message.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{message.user}</span>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <p className="text-sm mt-1 bg-gradient-to-r from-background to-background/50 p-2 rounded-lg border border-border">
                  {message.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
            <p>No messages yet</p>
            <p className="text-sm mt-1">Be the first to say hello!</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-background/50"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
