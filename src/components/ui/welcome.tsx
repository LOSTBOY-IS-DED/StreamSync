"use client";
import { useSession } from "next-auth/react"

export function Welcome(){

    const session = useSession();


    return (
        <div>
            <h1>
                Welcome, {session?.data?.user?.name}
            </h1>
        </div>
    )
}