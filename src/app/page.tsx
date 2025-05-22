import Features3D from "@/components/features-3d";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Navbar />
      <Hero />
      <Introduction />
      <Features3D />
    </main>
  )
}
