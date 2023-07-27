import Recipe from "@/models/recipe";
import { addRecipe, getRecipes } from "@/services/recipe-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const recipe = await addRecipe(new Recipe(
      "",
      body.name,
      body.imagePath,
      body.ingredients,
      body.steps,
      new Date(),
      false,
      body.createdBy
    ));
  
    return NextResponse.json(recipe, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ "message": "error on create recipe" }, {
      status: 400,
    });
  }

}


export async function GET() {
  const recipes = await getRecipes();

  return NextResponse.json(recipes, {
    status: 200,
  });
}