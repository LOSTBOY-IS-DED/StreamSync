


import Navbar from "@/components/Navbar";


console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);

export default function Home() {
  

  return (
    <div className="">
      <Navbar />
      <div className="mt-24">
        {/* <Hero/> */}
        {/* <Button variant="primary" onClick={() => {
          toast("Hello sir !!")
        }}>Hello</Button> */}
      </div>
    </div>
  );
}
