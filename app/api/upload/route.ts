import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const R2_BUCKET = process.env.R2_BUCKET!;
const R2_PUBLIC_BASE = process.env.R2_PUBLIC_BASE!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function uploadToR2(buffer: Buffer, key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3.send(command);
}

export async function POST(request: NextRequest) {
  if (request.headers.get("x-api-key") !== process.env.API_KEY) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { message: "error on upload file" },
      { status: 400 }
    );
  }

  try {
    const imageId = uuidv4();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const folder = `${year}/${month}/`;
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // ========================================
    // 1) HD - WEBP 1200px
    // ========================================
    const hdWebp = await sharp(inputBuffer)
      .resize({ width: 1200 })
      .webp({ quality: 80 })
      .toBuffer();

    const keyHdWebp = `${folder}${imageId}-hd.webp`;
    await uploadToR2(hdWebp, keyHdWebp, "image/webp");
    const urlHdWebp = `${R2_PUBLIC_BASE}/${keyHdWebp}`;

    // ========================================
    // 2) THUMB - WEBP 300px
    // ========================================
    const thumbWebp = await sharp(inputBuffer)
      .resize({ width: 300 })
      .webp({ quality: 75 })
      .toBuffer();

    const keyThumbWebp = `${folder}${imageId}-thumb.webp`;
    await uploadToR2(thumbWebp, keyThumbWebp, "image/webp");
    const urlThumbWebp = `${R2_PUBLIC_BASE}/${keyThumbWebp}`;

    const blurBuffer = await sharp(inputBuffer)
      .resize({ width: 20 })
      .webp({ quality: 40 })
      .toBuffer();

    const blurBase64 = `data:image/webp;base64,${blurBuffer.toString(
      "base64"
    )}`;

    return NextResponse.json(
      {
        message: "upload success",
        folder,
        id: imageId,

        hdWebp: urlHdWebp,
        thumbWebp: urlThumbWebp,
        blurDataUrl: blurBase64,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { message: "internal error", error },
      { status: 500 }
    );
  }
}
