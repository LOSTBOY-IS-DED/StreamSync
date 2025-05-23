"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // This prevents hydration mismatch by only rendering once the component is mounted
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure but no theme switching
    return <div className="contents">{children}</div>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
