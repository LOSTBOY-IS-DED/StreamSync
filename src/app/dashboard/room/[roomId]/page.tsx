"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Dashboard } from "@/components/dashboard/dashboard"
import { WebSocketProvider } from "@/context/WebContext"
import { Loader2 } from 'lucide-react'
import { toast } from "sonner"
import axios from "axios"
import { AxiosError } from "axios"

interface RoomData {
  room: {
    id: string
    code: string
    name: string
    adminId: string
    allowSongAdd: boolean
  }
  isAdmin: boolean
  userId: string
}

export default function DashboardPage() {
  const { roomId } = useParams() as { roomId: string }
  const router = useRouter()
  const { data: session, status } = useSession()
  const [roomData, setRoomData] = useState<RoomData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "loading") return

    if (!session?.user) {
      router.push("/")
      return
    }

    const fetchRoomData = async () => {
      try {
        setLoading(true)

        // ✅ Get user data
        const userResponse = await axios.get("/api/user/fetchUser")
        if (userResponse.status !== 200) {
          throw new Error("Failed to fetch user data")
        }
        const userData = userResponse.data.user

        // ✅ Fetch room data directly using roomId
        const roomResponse = await axios.get(`/api/room/${roomId}`)
        if (roomResponse.status !== 200) {
          throw new Error("Failed to fetch room")
        }
        const room = roomResponse.data.room

        setRoomData({
          room: {
            id: room.id,
            code: room.code,
            name: room.name || `Room ${roomId}`,
            adminId: room.adminId,
            allowSongAdd: room.allowSongAdd ?? true,
          },
          isAdmin: userData.id === room.adminId,
          userId: userData.id,
        })

        // ✅ Logs for debugging
        console.log("roomId:", roomId)
        console.log("userId:", userData.id)

      } catch (error) {
        const axiosError = error as AxiosError

        console.error("Error fetching room data:", error)
        if (axiosError.response?.status === 404) {
          setError("Room not found")
          toast.error("Room not found")
        } else if (axiosError.response?.status === 403) {
          setError("Unauthorized access")
          toast.error("You don't have access to this room")
        } else {
          setError("Failed to load room")
          toast.error("Failed to load room data")
        }
        setTimeout(() => router.push("/room"), 2000)
      } finally {
        setLoading(false)
      }
    }

    if (roomId) {
      fetchRoomData()
    }
  }, [roomId, session, status, router])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading room...</p>
        </div>
      </div>
    )
  }

  if (error || !roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Room Error</h1>
          <p className="text-muted-foreground mb-4">{error || "Failed to load room"}</p>
          <p className="text-sm text-muted-foreground">Redirecting to room selection...</p>
        </div>
      </div>
    )
  }

  return (
    <WebSocketProvider roomId={roomId} userId={roomData.userId}>
      <Dashboard roomData={roomData} />
    </WebSocketProvider>
  )
}
