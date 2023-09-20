import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // const { videoId } = await request.json();

  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: `bla-bla.mp3`,
        ContentType: "audio/mpeg",
      }),
      { expiresIn: 600 }
    );

    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.log("error");
  }
}
