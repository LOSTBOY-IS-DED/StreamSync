'use client'

import Button from "@/components/Button";
import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);

export default function Home() {
  

  return (
    <div className="">
      <Navbar />
      <div className="mt-24">
        <Hero/>
        <Button variant="primary" onClick={() => {
          toast("Hello sir !!")
        }}>Hello</Button>
      </div>
    </div>
  );
}
