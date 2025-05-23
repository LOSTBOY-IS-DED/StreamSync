import Image from "next/image"

export default function TrendingVideos() {
  return (
    <>
      <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
          <Image
            src="https://i.ytimg.com/vi/gQlMMD8auMs/hqdefault.jpg"
            alt="Video thumbnail"
            width={120}
            height={90}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2">BLACKPINK - &apos;Pink Venom&apos; M/V</h3>
          <p className="text-xs text-muted-foreground mt-1">BLACKPINK • 800M views</p>
        </div>
      </div>
      <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
          <Image
            src="https://i.ytimg.com/vi/gdZLi9oWNZg/hqdefault.jpg"
            alt="Video thumbnail"
            width={120}
            height={90}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2">BTS (방탄소년단) &apos;Dynamite&apos; Official MV</h3>
          <p className="text-xs text-muted-foreground mt-1">HYBE LABELS • 1.6B views</p>
        </div>
      </div>
      <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
          <Image
            src="https://i.ytimg.com/vi/kTJczUoc26U/hqdefault.jpg"
            alt="Video thumbnail"
            width={120}
            height={90}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium line-clamp-2">The Kid LAROI, Justin Bieber - STAY</h3>
          <p className="text-xs text-muted-foreground mt-1">The Kid LAROI • 700M views</p>
        </div>
      </div>
    </>
  )
}
