// get session then get user where : email : session.email

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req : any , res : any ){
    
    const session = await getServerSession(); 

    const user = prismaClient.user.findFirst({
        where :{
            email : session?.user?.email ?? ""
        }
    }); 

    if(!user){
        NextResponse.json({
            message : "You are unauthorized !!!"
        }, {
            status : 403
        })
    }

    return NextResponse.json({
        user
    })
}