"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData?.user) {
      router.push("/room");
    }
  }, [sessionData, router]);

  return null;
}
