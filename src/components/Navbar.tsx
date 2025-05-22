// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Video, Music, LogIn } from "lucide-react"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-screen-lg mx-auto px-4">
//         <div className="bg-black/70 backdrop-blur-md rounded-full mt-4 border border-white/10">
//           <div className="flex items-center justify-between p-2 px-4">
//             <Link href="/" className="flex items-center">
//               <svg
//                 width="160"
//                 height="40"
//                 viewBox="0 0 320 80"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 role="img"
//                 aria-label="StreamSync logo"
//               >
//                 {/* Abstract S icon with streaming bars and circular sync lines */}
//                 <g transform="translate(20,10)">
//                   {/* Outer circular sync line */}
//                   <circle
//                     cx="30"
//                     cy="30"
//                     r="28"
//                     stroke="url(#gradient1)"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeDasharray="10 20"
//                   />
//                   {/* Inner sync line */}
//                   <circle
//                     cx="30"
//                     cy="30"
//                     r="18"
//                     stroke="url(#gradient1)"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeDasharray="5 15"
//                   />

//                   {/* Streaming bars forming an S shape */}
//                   <rect x="18" y="10" width="4" height="10" fill="url(#gradient2)" rx="1" />
//                   <rect x="26" y="16" width="4" height="14" fill="url(#gradient2)" rx="1" />
//                   <rect x="34" y="22" width="4" height="10" fill="url(#gradient2)" rx="1" />
//                   <rect x="26" y="38" width="4" height="10" fill="url(#gradient2)" rx="1" />
//                   <rect x="18" y="44" width="4" height="6" fill="url(#gradient2)" rx="1" />
//                 </g>

//                 {/* StreamSync text with no space and both S capital */}
//                 <text
//                   x="90"
//                   y="52"
//                   fill="white"
//                   fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//                   fontWeight="700"
//                   fontSize="32"
//                   letterSpacing="1"
//                 >
//                   <tspan>Stream</tspan>
//                   <tspan fill="url(#gradient2)">Sync</tspan>
//                 </text>

//                 {/* Define gradients */}
//                 <defs>
//                   <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#8B5CF6" />
//                     <stop offset="100%" stopColor="#EC4899" />
//                   </linearGradient>
//                   <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#8B5CF6" />
//                     <stop offset="100%" stopColor="#EC4899" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </Link>

//             <div className="flex items-center gap-4">
//               <Link href="/rooms" className="flex items-center gap-1 text-white/90 hover:text-white">
//                 <Video className="w-4 h-4" />
//                 <span>Rooms</span>
//               </Link>

//               <Link href="/music" className="flex items-center gap-1 text-white/90 hover:text-white">
//                 <Music className="w-4 h-4" />
//                 <span>Music</span>
//               </Link>

//               <div className="h-6 w-px bg-white/20 mx-1"></div>

//               <Button
//                 variant="default"
//                 size="sm"
//                 className="rounded-full border-white/20 bg-transparent hover:bg-white/10"
//               >
//                 <LogIn className="w-4 h-4 mr-1" />
//                 Sign In
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Video, Music, LogIn, LogOut } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="bg-black/70 backdrop-blur-md rounded-full mt-4 border border-white/10">
          <div className="flex items-center justify-between p-2 px-4">
            <Link href="/" className="flex items-center">
              <svg
                width="160"
                height="40"
                viewBox="0 0 320 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="StreamSync logo"
              >
                {/* Abstract S icon with streaming bars and circular sync lines */}
                <g transform="translate(20,10)">
                  {/* Outer circular sync line */}
                  <circle
                    cx="30"
                    cy="30"
                    r="28"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="10 20"
                  />
                  {/* Inner sync line */}
                  <circle
                    cx="30"
                    cy="30"
                    r="18"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5 15"
                  />

                  {/* Streaming bars forming an S shape */}
                  <rect x="18" y="10" width="4" height="10" fill="url(#gradient2)" rx="1" />
                  <rect x="26" y="16" width="4" height="14" fill="url(#gradient2)" rx="1" />
                  <rect x="34" y="22" width="4" height="10" fill="url(#gradient2)" rx="1" />
                  <rect x="26" y="38" width="4" height="10" fill="url(#gradient2)" rx="1" />
                  <rect x="18" y="44" width="4" height="6" fill="url(#gradient2)" rx="1" />
                </g>

                {/* StreamSync text with no space and both S capital */}
                <text
                  x="90"
                  y="52"
                  fill="white"
                  fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                  fontWeight="700"
                  fontSize="32"
                  letterSpacing="1"
                >
                  <tspan>Stream</tspan>
                  <tspan fill="url(#gradient2)">Sync</tspan>
                </text>

                {/* Define gradients */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/rooms" className="flex items-center gap-1 text-white/90 hover:text-white">
                <Video className="w-4 h-4" />
                <span>Rooms</span>
              </Link>

              <Link href="/music" className="flex items-center gap-1 text-white/90 hover:text-white">
                <Music className="w-4 h-4" />
                <span>Music</span>
              </Link>

              <div className="h-6 w-px bg-white/20 mx-1"></div>

              {session?.user ? (
                <div className="flex items-center gap-2">
                  {session.user.image && (
                    <Image
                      src={session.user.image || "/placeholder.svg"}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full border border-white/20 object-cover"
                    />
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/20 bg-transparent hover:bg-white/10"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/20 bg-transparent hover:bg-white/10"
                  onClick={() => signIn("google")}
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
