// For adding video to streams
/* eslint-disable @typescript-eslint/no-unused-vars */

import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { search } from "youtube-search-without-api-key";

function extractVideoId(url: string | null): string | null {
  if (!url) return null;

  const regex =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|e\/)|youtu\.be\/)([^&?/]+)/;

  const match = url.match(regex);
  return match?.[1] ?? null;
}


export async function POST(req : NextRequest){
    const data = await req.json();

    try{
      if(!data.url){
        return console.error("No URL found !!!");
      }

      //extracting video from the URL
      const extractedId = extractVideoId(data.url);
      const query = extractedId ;

      if(!query){
        throw new Error ("Video Query Cant be extracted !!!")
      }
      const result = await search(query);

      if(!result  || result.length === 0){
        throw new Error ("No result found for the given query !!!")
      }

      const video = result[0];
      const videoTitle = video.title;
      const bigImg = video.snippet.thumbnails?.high?.url || 
            "https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png";

      return NextResponse.json({
            message: "Added Stream",
            id: crypto.randomUUID(),
            title: videoTitle,
            bigImg: bigImg
        });
        
    }catch(err){
      console.log(err);
      return NextResponse.json({
        message : "Error while adding stream" , 
        error : err
      }, {
        status : 500
      })
    }
}
