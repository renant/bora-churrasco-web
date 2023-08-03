import { getPosts } from "@/services/notion-blog-service";
import { NextResponse } from "next/server";


export async function GET() {

  const posts = await getPosts();

  return NextResponse.json(posts, {
    status: 200,
  });
}