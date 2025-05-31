"use client"

import type React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, Send } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useWebSocket } from "@/context/WebContext"
import Switch from "../Button1"
import Image from "next/image"

interface ChatProps {
  chatMessages: {
    id: string
    user: string
    message: string
    avatar: string // can be image URL or initial
    time: string
  }[]
  newMessage: string
  setNewMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
  isAdmin?: boolean
}

export function Chat({ chatMessages, newMessage, setNewMessage, handleSendMessage, isAdmin = false }: ChatProps) {
  const webSocketData = useWebSocket()
  let chatPaused = false
  let messageControl = () => {
    console.log("Mock messageControl")
  }

  if (webSocketData) {
    chatPaused = webSocketData.chatPaused
    messageControl = webSocketData.messageControl
  }

  return (
    <div className="bg-card rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Live Chat</h2>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{chatPaused ? "Toggle Off" : "Toggle On"}</span>
              <Switch />
            </div>
          )}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {chatMessages.map((message, index) => (
            <motion.div
              key={message.id ?? `message-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex gap-3"
            >
              <Avatar className="h-8 w-8">
                {message.avatar?.startsWith("http") ? (
                  <Image src={message.avatar} alt={message.user} className="h-full w-full object-cover rounded-full" />
                ) : (
                  <AvatarFallback>{message.avatar || "U"}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{message.user || "Unknown"}</span>
                  <span className="text-xs text-muted-foreground">{message.time || ""}</span>
                </div>
                <p className="text-sm mt-1">{message.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* No messages fallback */}
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
            <p>No messages yet</p>
            <p className="text-sm mt-1">Be the first to say hello!</p>
          </div>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder={chatPaused ? "Chat is paused by admin" : "Type a message..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            disabled={chatPaused}
          />
          <Button type="submit" size="icon" disabled={chatPaused}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
