import { getRecipeById } from "@/services/recipe-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url)
  
  const id = pathname.split("/").pop() ?? "";

  const recipe = await getRecipeById(id);

  return NextResponse.json(recipe, {
    status: 200,
  });
}