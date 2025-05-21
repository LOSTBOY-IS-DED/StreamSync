"use client";

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react";
// recoil , theme provider


type Children = {
    children: ReactNode
}

export const Providers = ({children} : Children) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}