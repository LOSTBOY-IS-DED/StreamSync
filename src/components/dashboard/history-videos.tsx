import Image from "next/image";

export default function HistoryVideos() {
  return (
    <>
      <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
          <Image
            src="https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2">Ed Sheeran - Shape of You</h3>
          <p className="text-xs text-muted-foreground mt-1">Played 2 days ago</p>
        </div>
      </div>
      <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
          <Image
            src="https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2">Wiz Khalifa - See You Again ft. Charlie Puth</h3>
          <p className="text-xs text-muted-foreground mt-1">Played 3 days ago</p>
        </div>
      </div>
      <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
          <Image
            src="https://i.ytimg.com/vi/fHI8X4OXluQ/hqdefault.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2">The Weeknd - Blinding Lights</h3>
          <p className="text-xs text-muted-foreground mt-1">Played 5 days ago</p>
        </div>
      </div>
    </>
  )
}
