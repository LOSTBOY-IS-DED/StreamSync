import type { Metadata } from "next";
import { Lato , Outfit } from "next/font/google";
import "./globals.css";


// const lato = Lato({
//   subsets: ["latin"],
// })

const outfit = Outfit({
  subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "StreamSync",
    description: "Host your own synced streaming party — share YouTube and Spotify, manage the room, chat, and vibe with your crew.",
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
            <body
                className={outfit.className}
            >
                {children}
            </body>
        </html>
    );
}