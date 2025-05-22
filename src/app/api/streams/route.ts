import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { YT_REGEX } from "@/lib/utils";
// @ts-ignore
import youtubesearchapi from "youtube-search-api";

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
    const data = CreateStreamSchema.parse(await req.json());

    const isYT = data.url.match(YT_REGEX);
    if (!isYT) {
      return NextResponse.json(
        { message: "Wrong URL Format !!!" },
        { status: 411 }
      );
    }

    const videoId = isYT[1]; // assuming YT_REGEX has a capture group
    if (!videoId) {
      return NextResponse.json(
        { message: "Invalid YouTube URL format" },
        { status: 400 }
      );
    }

    const res = await youtubesearchapi.GetVideoDetails(videoId);
    const thumbnails = res.thumbnail?.thumbnails ?? [];

    if (thumbnails.length === 0) {
      console.warn("No thumbnails found for video:", videoId);
    }

    const smallImg =
      thumbnails.length >= 2
        ? thumbnails[thumbnails.length - 2].url
        : thumbnails.length === 1
          ? thumbnails[0].url
          : "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg";

    const bigImg =
      thumbnails.length >= 1
        ? thumbnails[thumbnails.length - 1].url
        : "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg";

    // console.log("small Image : " ,  smallImg);
    // console.log("big Image : ", bigImg);

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: videoId,
        type: "Youtube",
        title: res.title ?? "Can't find video",
        smallImg,
        bigImg,
      },
    });

    return NextResponse.json({
      message: "Added stream",
      id: stream.id,
    });
  } catch (e) {
    console.log("Error in POST /stream:", e);
    return NextResponse.json(
      { message: "Error while adding a stream" },
      { status: 411 }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorID = req.nextUrl.searchParams.get("creatorId");

  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorID ?? "",
    },
  });

  return NextResponse.json({
    streams,
  });
}
