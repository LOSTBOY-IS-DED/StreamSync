import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);

export default function Home() {
  

  return (
    <div className="c">
      <Navbar />
      <div className="mt-24">
        <Hero/>
      </div>
    </div>
  );
}
