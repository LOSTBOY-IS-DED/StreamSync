import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/SessionProvider";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreamSync",
  description:
    "Host your own synced streaming party — share YouTube and Spotify, manage the room, chat, and vibe with your crew.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      
        <body className={`${outfit.variable} font-sans antialiased  bg-neutral-950  text-white`}>
            <Providers>
                {children}
            </Providers>
        
      </body>

      
    </html>
  );
}
