import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "./db";

export const authOptions = {
    providers : [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })

    ], 
    secret: process.env.NEXTAUTH_SECRET,
    callbacks : {
        //@ts-ignore
        async signIn(params ){
            if(!params.user.email){
                return false ;
            }
            try {
                await prismaClient.user.create({
                    data : {
                        email : params.user.email, 
                        provider : "Google"
                    }
                })
            }catch(e){

            }
            return true; 
        }
    }
}