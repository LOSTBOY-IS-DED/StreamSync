/* eslint-disable @typescript-eslint/no-unused-vars */

import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(); // Get current user session
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");
    const roomId = pathSegments[pathSegments.length - 1];
    // console.log("room id is here:-", roomId);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });


    try {
        const room = await prismaClient.room.findUnique({
            where: { code: roomId },
        });

        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }


        const isAdmin = user ? user.id === room.adminId : false;

        return NextResponse.json({ room, isAdmin, userId: user?.id });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}