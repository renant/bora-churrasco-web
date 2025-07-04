import { type GetRecipeParams, getRecipes } from "@/app/recipes/actions";
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

    const query: GetRecipeParams = {
      limit: body.limitSize,
      page: body.start_cursor,
    };

    const recipes = await getRecipes(query);

    return NextResponse.json(recipes, {
      status: 200,
    });
  } catch (_error) {
    return NextResponse.json(
      { message: "error on get recipes" },
      {
        status: 400,
      }
    );
  }
}
