export interface QueueItem {
  id: string
  title: string
  thumbnail: string
  votes: number
  duration: string
  userVote: "up" | "down" | null
  addedBy: string
}

export interface ChatMessage {
  id: string
  user: string
  message: string
  avatar: string
  time: string
}

export interface CurrentVideo {
  id: string
  title: string
  channel: string
  views: string
  likes: string
  publishedAt: string
}

export interface RoomInfo {
  id: string
  name: string
  host: string
  activeUsers: number
  totalSongs: number
}
