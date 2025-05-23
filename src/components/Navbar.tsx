"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Video, Music, LogIn, LogOut, Menu, X } from "lucide-react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-5 lg:py-6">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="border border-white/15 rounded-[27px] md:rounded-full bg-black/70 backdrop-blur-md">
            <div className="grid grid-cols-2 md:grid-cols-3 p-3 px-5 items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <svg
                  width="140"
                  height="36"
                  viewBox="0 0 320 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="StreamSync logo"
                  className="h-9 w-auto md:h-9"
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

              {/* Desktop Navigation */}
              <div className="hidden md:flex justify-center items-center">
                <nav className="flex gap-6 font-medium">
                  <Link href="/" className="flex items-center gap-1 text-white/90 hover:text-white">
                    <Video className="w-4 h-4" />
                    <span>home</span>
                  </Link>

                  <Link href="/dashboard" className="flex items-center gap-1 text-white/90 hover:text-white">
                    <Music className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </nav>
              </div>

              {/* Sign In Button & Mobile Menu */}
              <div className="flex justify-end items-center gap-3">
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden flex items-center justify-center"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </button>

                {/* Desktop Sign In Button */}
                <div className="hidden md:block">
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

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-4 py-4">
                    <Link
                      href="/rooms"
                      className="flex items-center gap-1 text-white/90 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <Video className="w-4 h-4" />
                      <span>Rooms</span>
                    </Link>

                    <Link
                      href="/music"
                      className="flex items-center gap-1 text-white/90 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <Music className="w-4 h-4" />
                      <span>Music</span>
                    </Link>

                    {session?.user ? (
                      <div className="flex items-center gap-2 mt-2">
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
                        className="rounded-full border-white/20 bg-transparent hover:bg-white/10 mt-2"
                        onClick={() => signIn("google")}
                      >
                        <LogIn className="w-4 h-4 mr-1" />
                        Sign In
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from being hidden under the navbar */}
      <div className="pb-[86px] md:pb-[98px] lg:pb-[130px]"></div>
    </>
  )
}
