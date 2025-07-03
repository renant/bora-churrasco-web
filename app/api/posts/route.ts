import { type GetPostParams, getPosts } from "@/app/blog/actions";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.headers.get("x-api-key") !== process.env.API_KEY) {
    return NextResponse.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  try {
    const body = await request.json();

    if (body.limitSize === undefined) {
      return NextResponse.json(
        { message: "limitSize is required" },
        {
          status: 400,
        }
      );
    }

    const query: GetPostParams = {
      limit: body.limitSize,
      page: body.start_cursor,
      sort: "date_desc",
    };

    const posts = await getPosts(query);

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (_error) {
    return NextResponse.json(
      { message: "error on get posts" },
      {
        status: 400,
      }
    );
  }
}
