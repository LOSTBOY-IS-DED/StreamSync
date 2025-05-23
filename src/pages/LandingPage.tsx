"use client";
export const dynamic = 'force-dynamic';

import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import Features3D from "@/components/features-3d";
import { Redirect } from "@/components/Redirect";


export default function LandingPage(){
    return(
        <>
        <main className="min-h-screen bg-black text-white pt-20">
      <Navbar />
      <Redirect />
      <Hero />
      <Introduction />
      <Features3D />
    </main>
        </>
    )
}