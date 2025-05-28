"use client"

import { useState } from "react"
import { useWebSocket } from "@/context/WebContext"
import { cn } from "@/lib/utils"

export default function Switch() {
  const { allowSongAdd, songAddStatus } = useWebSocket()
  const [isToggled, setIsToggled] = useState(songAddStatus)

  const handleToggle = () => {
    setIsToggled(!isToggled)
    allowSongAdd()
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
        songAddStatus ? "bg-purple-600" : "bg-gray-300",
      )}
      role="switch"
      aria-checked={songAddStatus}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          songAddStatus ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  )
}
