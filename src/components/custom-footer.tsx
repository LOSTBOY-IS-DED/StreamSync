"use client"

import { motion } from "framer-motion"
import { Music, Heart, Github, Twitter, Instagram, Mail, ExternalLink, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function CustomFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const socialVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.95 },
  }

  const linkVariants = {
    hover: {
      x: 5,
      color: "#a855f7",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20 border-t border-gray-800"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                StreamSync
              </h3>
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Sync your music experience with friends. Create rooms, vote for songs, and enjoy music together in
              real-time.
            </p>
            <Badge variant="outline" className="border-purple-500/30 text-purple-300">
              <Heart className="h-3 w-3 mr-1" />
              Made with love
            </Badge>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {["Dashboard", "Create Room", "Join Room", "History", "Settings"].map((link, index) => (
                <motion.li key={index} variants={linkVariants} whileHover="hover">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span>{link}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-lg">Features</h4>
            <ul className="space-y-3">
              {["Real-time Sync", "YouTube Integration", "Voting System", "Live Chat", "Mobile Support"].map(
                (feature, index) => (
                  <motion.li key={index} variants={linkVariants} whileHover="hover">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-pink-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span>{feature}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-lg">Connect</h4>
            <p className="text-gray-400 text-sm mb-4">Follow us for updates and join our community!</p>

            {/* Social Media Icons */}
            <div className="flex gap-3 mb-4">
              {[
                { icon: Github, color: "hover:bg-gray-700" , link : "https://github.com/LOSTBOY-IS-DED" },
                { icon: Twitter, color: "hover:bg-blue-600", link : "https://x.com/SubhajitChaud18"},
                { icon: Instagram, color: "hover:bg-pink-600", link : "https://www.instagram.com/subh_192.168.1.1/" },
                { icon: Mail, color: "hover:bg-purple-600", link : "mailto:subhajitchaudhury05@gmail.com" },
              ].map((social, index) => (
                <motion.button
                  key={index}
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all duration-300 ${social.color}`}
                >
                  <Link href={social.link} >
                    <social.icon className="h-4 w-4" />
                  </Link>
                  
                </motion.button>
              ))}
            </div>

            {/* Newsletter */}
            {/* <div className="space-y-2">
              <p className="text-sm text-gray-400">Stay updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Subscribe
                </Button>
              </div>
            </div> */}
          </motion.div>
        </div>

        <Separator className="bg-gray-800 mb-6" />

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 StreamSync. All rights reserved.</p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                variants={linkVariants}
                whileHover="hover"
                className="hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                variants={linkVariants}
                whileHover="hover"
                className="hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                variants={linkVariants}
                whileHover="hover"
                className="hover:text-purple-400 transition-colors"
              >
                Support
              </motion.a>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
            >
              <Music className="h-4 w-4 text-purple-500/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
