// Mock data for queue items
export const initialQueueItems = [
  {
    id: "1",
    title: "Daft Punk - Get Lucky (Official Audio) ft. Pharrell Williams, Nile Rodgers",
    thumbnail: "https://i.ytimg.com/vi/5NV6Rdv1a3I/hqdefault.jpg",
    votes: 15,
    duration: "6:07",
    userVote: null,
    addedBy: "Alex",
  },
  {
    id: "2",
    title: "The Weeknd - Blinding Lights (Official Video)",
    thumbnail: "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
    votes: 8,
    duration: "4:22",
    userVote: "up",
    addedBy: "Jamie",
  },
  {
    id: "3",
    title: "Dua Lipa - Levitating Featuring DaBaby (Official Music Video)",
    thumbnail: "https://i.ytimg.com/vi/TUVcZfQe-Kw/hqdefault.jpg",
    votes: 5,
    duration: "3:23",
    userVote: "down",
    addedBy: "Taylor",
  },
  {
    id: "4",
    title: "Bruno Mars, Anderson .Paak, Silk Sonic - Leave the Door Open [Official Video]",
    thumbnail: "https://i.ytimg.com/vi/adLGHcj_fmA/hqdefault.jpg",
    votes: 12,
    duration: "4:02",
    userVote: null,
    addedBy: "Jordan",
  },
  {
    id: "5",
    title: "Glass Animals - Heat Waves (Official Video)",
    thumbnail: "https://i.ytimg.com/vi/mRD0-GxqHVo/hqdefault.jpg",
    votes: 7,
    duration: "3:58",
    userVote: null,
    addedBy: "Casey",
  },
]

// Mock data for chat messages
export const initialChatMessages = [
  { id: "1", user: "Alex", message: "Hey everyone! Welcome to the stream!", avatar: "A", time: "4:20 PM" },
  { id: "2", user: "Jamie", message: "The music is awesome today!", avatar: "J", time: "4:22 PM" },
  { id: "3", user: "Taylor", message: "Can someone add some Dua Lipa?", avatar: "T", time: "4:25 PM" },
  { id: "4", user: "Jordan", message: "Just added Bruno Mars to the queue!", avatar: "J", time: "4:28 PM" },
  { id: "5", user: "Casey", message: "Vibing to this playlist 🎵", avatar: "C", time: "4:30 PM" },
]

// Mock data for current video
export const currentVideo = {
  id: "5NV6Rdv1a3I",
  title: "Daft Punk - Get Lucky (Official Audio) ft. Pharrell Williams, Nile Rodgers",
  channel: "Daft Punk",
  views: "542M views",
  likes: "3.2M",
  publishedAt: "10 years ago",
}

// Mock data for room info
export const roomInfo = {
  id: "stream-sync-123",
  name: "Music Vibes",
  host: "StreamSync",
  activeUsers: 42,
  totalSongs: 15,
}
