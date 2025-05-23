"use client";

import dynamicImport from "next/dynamic";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import Features3D from "@/components/features-3d";

// Marking dynamic imports with ssr: false
const Navbar = dynamicImport(() => import("@/components/Navbar"), { ssr: false });
const Redirect = dynamicImport(() => import("@/components/Redirect").then(mod => mod.Redirect), { ssr: false });

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Navbar />
      <Redirect />
      <Hero />
      <Introduction />
      <Features3D />
    </main>
  );
}
