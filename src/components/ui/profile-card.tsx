"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Mail, Settings} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

interface ProfileHoverProps {
  className?: string;
}

export function ProfileHover({ className }: ProfileHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;
  const image = user?.image || "";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
      >
        <Avatar className="h-10 w-10 ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300">
          <AvatarImage src={image} alt={user?.name || "User"} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-semibold">
            {getInitials(user?.name || "User")}
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <>
            <div className="fixed inset-0 z-40 pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.2,
              }}
              className="absolute top-full right-0 mt-3 z-50 w-80"
            >
              <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-900 border-l border-t border-gray-700 rotate-45 dark:bg-gray-800 dark:border-gray-600" />

              <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden dark:bg-gray-800 dark:border-gray-600">
                <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-white/30">
                      <AvatarImage src={image} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-bold">
                        {getInitials(user?.name || "User")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white text-lg truncate">
                          {user?.name}
                        </h3>
                        {/* <Badge
                          variant="secondary"
                          className="bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                        >
                          Online
                        </Badge> */}
                      </div>

                      <div className="flex items-center gap-2 text-white/90 mb-2">
                        <Mail className="h-3 w-3 flex-shrink-0" />
                        <span className="text-sm truncate">{user?.email}</span>
                      </div>

                      {/* <div className="flex items-center gap-2">
                        <Crown className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-yellow-300">Premium Member</span>
                      </div> */}
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700 dark:bg-gray-600" />

                <div className="p-4 space-y-2 bg-gray-900 dark:bg-gray-800">
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Account Settings
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={async () => {
                        await signOut({ redirect: false });
                        toast.success("Logged out successfully!");
                        window.location.href = "/"; // Needed manual redirect
                      }}
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </motion.div>
                </div>

                <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 dark:bg-gray-700 dark:border-gray-600">
                  <p className="text-xs text-gray-400 text-center">
                    StreamSync Premium • Member since 2024
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
