import { getRecipe } from "@/app/recipes/actions";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);

  const id = pathname.split("/").pop() ?? "";

  const recipe = await getRecipe(id);

  return NextResponse.json(recipe, {
    status: 200,
  });
}
