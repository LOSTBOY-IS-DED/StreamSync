"use client"

import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight, Users, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import type { RoomInfo } from "@/lib/types"

interface HeaderProps {
  roomInfo: RoomInfo
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ roomInfo, sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix for hydration mismatch with theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-b border-border p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex">
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
        <h1 className="text-xl font-bold">StreamSync Dashboard</h1>
        <Badge variant="outline" className="ml-2">
          <Users className="h-3 w-3 mr-1" />
          {roomInfo.activeUsers} active
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
