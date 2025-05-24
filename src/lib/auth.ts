import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "./db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              email: user.email,
              name: user.name ?? "user",
              image: user.image ?? "",
              provider: "Google",
            },
          });
        }
      } catch (e) {
        console.error("Error in signIn callback:", e);
        return false;
      }

      return true;
    },
  },
};
