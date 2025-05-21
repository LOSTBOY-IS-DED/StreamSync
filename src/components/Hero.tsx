"use client";


import { useSession } from "next-auth/react";

export const Hero = () => {
  const session = useSession();

  return (
    <section className="mt-7">
      <div className="container max-w-5xl mx-auto">
        {
            session?.data?.user ? <h1 className="text-7xl">Hello , {session.data?.user?.name}</h1> : 
            <h1 className="text-7xl">Please Sign In </h1>
        }
      </div>
      
    </section>
  );
};
