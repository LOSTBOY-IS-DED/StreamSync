"use client"

import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Toaster() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render with theme after mounting to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <SonnerToaster
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    />
  )
}

// Also export as SonnerProvider for convenience
export { Toaster as SonnerProvider }
