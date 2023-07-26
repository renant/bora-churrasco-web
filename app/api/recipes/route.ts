import Recipe from "@/models/recipe";
import { addRecipe, getRecipes } from "@/services/recipe-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const recipe = addRecipe(new Recipe(
    "",
    body.name,
    body.description,
    body.imagePath,
    body.ingredients,
    body.steps
  ));

  return NextResponse.json(recipe, {
    status: 201,
  });
}


export async function GET(request: NextRequest) {
  const { search } = new URL(request.url)

  console.log(search);

  const recipes = await getRecipes();

  return NextResponse.json(recipes, {
    status: 200,
  });
}