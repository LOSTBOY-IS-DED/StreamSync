"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Music, Users, Plus, Search, Clipboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

interface SidebarContentProps {
  roomInfo: {
    id: string;
    name: string;
    host: string;
    activeUsers: number;
    totalSongs: number;
  };
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
  handleAddYoutubeUrl: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isMobile?: boolean;
  closeMobileMenu?: () => void;
  copyRoomId: () => void;
}

export function SidebarContent({
  roomInfo,
  youtubeUrl,
  setYoutubeUrl,
  handleAddYoutubeUrl,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isMobile = false,
  closeMobileMenu = () => {},
  copyRoomId,
}: SidebarContentProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Logo and room info */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Music className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">StreamSync</h1>
        </motion.div>
        <div className="bg-card rounded-lg p-4 w-full">
          <h2 className="font-semibold">{roomInfo.name}</h2>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-muted-foreground">
              Room ID: {roomInfo.id}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={copyRoomId}
              title="Copy Room ID"
            >
              <Clipboard className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{roomInfo.activeUsers}</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="h-4 w-4" />
              <span>{roomInfo.totalSongs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add YouTube URL */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Add to Queue</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Paste YouTube URL..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <Button className="bg-purple-500" onClick={handleAddYoutubeUrl}>
            <Plus className=" h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Search YouTube</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search for videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="bg-purple-500" type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Tabs for different content */}
      <Tabs defaultValue="trending">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="trending" className="space-y-2 mt-2">
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
              <h3 className="text-sm font-medium line-clamp-2">
                BLACKPINK - &apos;Pink Venom&apos; M/V
              </h3>

              <p className="text-xs text-muted-foreground mt-1">
                BLACKPINK • 800M views
              </p>
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
              <h3 className="text-sm font-medium line-clamp-2">
                BTS (방탄소년단) &apos;Dynamite&apos; Official MV
              </h3>

              <p className="text-xs text-muted-foreground mt-1">
                HYBE LABELS • 1.6B views
              </p>
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
              <h3 className="text-sm font-medium line-clamp-2">
                The Kid LAROI, Justin Bieber - STAY
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                The Kid LAROI • 700M views
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history" className="space-y-2 mt-2">
          <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
              <Image
                src="https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg"
                alt="Video thumbnail"
                width={120}
                height={90}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2">
                Ed Sheeran - Shape of You
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Played 2 days ago
              </p>
            </div>
          </div>
          <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
              <Image
                src="https://i.ytimg.com/vi/RgKAFK5djSk/hqdefault.jpg"
                alt="Video thumbnail"
                width={120}
                height={90}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2">
                Wiz Khalifa - See You Again ft. Charlie Puth
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Played 3 days ago
              </p>
            </div>
          </div>
          <div className="bg-card rounded-lg p-3 flex gap-3 hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
              <Image
                src="https://i.ytimg.com/vi/fHI8X4OXluQ/hqdefault.jpg"
                alt="Video thumbnail"
                width={120}
                height={90}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2">
                The Weeknd - Blinding Lights
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Played 5 days ago
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Mobile close button */}
      {isMobile && (
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full"
            onClick={closeMobileMenu}
          >
            Close Menu
          </Button>
        </div>
      )}
    </div>
  );
}
