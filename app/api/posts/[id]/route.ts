import { getPost } from "@/app/blog/actions";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);

  const id = pathname.split("/").pop() ?? "";

  const post = await getPost(id);

  return NextResponse.json(post, {
    status: 200,
  });
}
