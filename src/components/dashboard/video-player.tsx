interface VideoPlayerProps {
  currentVideo: {
    id: string
    title: string
    channel: string
    views: string
    likes: string
    publishedAt: string
  }
}

export function VideoPlayer({ currentVideo }: VideoPlayerProps) {
  return (
    <>
      {/* Video player */}
      <div className="rounded-lg overflow-hidden bg-black aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video info */}
      <div className="bg-card rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold">{currentVideo.title}</h2>
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{currentVideo.channel}</span>
            <span>•</span>
            <span>{currentVideo.views}</span>
            <span>•</span>
            <span>{currentVideo.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M7 10v12" />
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
            </svg>
            <span>{currentVideo.likes}</span>
          </div>
        </div>
      </div>
    </>
  )
}
