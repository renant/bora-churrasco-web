import { getRecipeById } from "@/services/recipe-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (request.headers.get('x-api-key') !== process.env.API_KEY) {
    return NextResponse.json({ "message": "unauthorized" }, {
      status: 401,
    });
  }

  const { pathname } = new URL(request.url)
  
  const id = pathname.split("/").pop() ?? "";

  const recipe = await getRecipeById(id);

  return NextResponse.json(recipe, {
    status: 200,
  });
}