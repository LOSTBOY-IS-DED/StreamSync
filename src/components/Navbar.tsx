"use client";
import Image from "next/image";
import logoImage from "@/assets/images/logo.svg";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Dashboard", href: "#dashboard" },
];

export default function Navbar() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="py-4 lg:py-8 fixed w-full top-0 z-50">
        <div className="container max-w-5xl mx-auto">
          <div className="border border-white/15 rounded-[27px] md:rounded-full bg-neutral-950/70 backdrop:blur">
            <div className="grid grid-cols-2 lg:grid-cols-3 p-2 px-4 md:pr-2 items-center">
              <div>
                <Image
                  src={logoImage}
                  alt="layers logo"
                  className="h-9 w-auto md:h-auto"
                />
              </div>

              <div className="lg:flex justify-center items-center hidden">
                <nav className="flex gap-6 font-medium ">
                  {navLinks.map((link) => (
                    <a href={link.href} key={link.label}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex justify-end gap-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu md:hidden cursor-pointer"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  <line
                    x1="3"
                    y1="6"
                    x2="21"
                    y2="6"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "rotate-45 -translate-y-1"
                    )}
                  ></line>
                  <line
                    x1="3"
                    y1="12"
                    x2="21"
                    y2="12"
                    className={twMerge("transition", isOpen && "opacity-0")}
                  ></line>
                  <line
                    x1="3"
                    y1="18"
                    x2="21"
                    y2="18"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "-rotate-45 translate-y-1"
                    )}
                  ></line>
                </svg>

                {session.data?.user ? (
                  <>
                    {session.data.user.image && (
                      <Image
                        src={session.data.user.image}
                        alt="User Avatar"
                        width={36}
                        height={36}
                        className="rounded-full border border-white object-cover"
                      />
                    )}
                    {/* <Button variant="primary" onClick={() => signOut()}>
                      Sign Out
                    </Button> */}
                    <Button
                      variant="primary"
                      onClick={async () => {
                        await signOut({ redirect: false });
                        const updatedSession = await getSession();
                        if (!updatedSession?.user) {
                          toast.success("User logged out successfully ✅");
                        } else {
                          toast.error("Failed to log out. Please try again.");
                        }
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  //   <Button variant="primary" onClick={() => signIn()}>
                  //     Sign In
                  //   </Button>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      const result = await signIn("google", {
                        redirect: false,
                      });
                      console.log("signIn result:", result);
                      if (!result?.ok) {
                        toast.success("Sign in successfully ✅");
                      } else {
                        toast.success("Signed in ");
                      }
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-4 py-4 ">
                    {navLinks.map((link) => (
                      <a className="" href={link.href} key={link.label}>
                        {link.label}
                      </a>
                    ))}
                    {session.data?.user ? (
                      //   <Button variant="primary" onClick={() => signOut()}>
                      //     Sign Out
                      //   </Button>
                      <Button
                        variant="primary"
                        onClick={async () => {
                          await signOut({ redirect: false });
                          const updatedSession = await getSession();
                          if (!updatedSession?.user) {
                            toast.success("User logged out successfully ✅");
                          } else {
                            toast.error("Failed to log out. Please try again.");
                          }
                        }}
                      >
                        Sign Out
                      </Button>
                    ) : (
                      //   <Button variant="primary" onClick={() => signIn()}>
                      //       Sign In
                      //   </Button>
                      <Button
                        variant="primary"
                        onClick={async () => {
                          const result = await signIn("google", {
                            redirect: false,
                          });
                          console.log("signIn result:", result);
                          if (!result?.ok) {
                            toast.success("Sign in successfully ✅");
                          } else {
                            toast.success("Signed in ");
                          }
                        }}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <div className="pb-[86px] md:pb-[98px] lg:pb-[130px]"></div>
    </>
  );
}
