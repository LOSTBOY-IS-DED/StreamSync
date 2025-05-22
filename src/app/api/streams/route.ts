import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const YT_REGEX = new RegExp(
  "/^https?://(www.)?youtube.com/watch?v=([w-]{11})(?:[&?][w=%-]*)*$"
);

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z
    .string()
    .refine((val) => val.includes("youtube") || val.includes("spotify"), {
      message: "URL must contain either 'youtube' or 'spotify'",
    }),
});

export async function POST(req: NextRequest) {
  try {
    // if the data the user sends you is not correct it will throw you an error
    const data = CreateStreamSchema.parse(await req.json());
    // now the db entry
    const isYT = YT_REGEX.test(data?.url);
    if (!isYT) {
      return NextResponse.json(
        {
          message: "Wrong URL Format !!!",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];
    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube", // for now hard coded ...
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  // how to get query params from the URL
  const creatorID = req.nextUrl.searchParams.get("creatorID");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorID ?? "",
    },
  });
  return NextResponse.json({
    streams,
  });
}
