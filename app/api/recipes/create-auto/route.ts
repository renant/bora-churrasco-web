import {
  createNewRecipe,
  createRecipeImage,
} from '@/services/recipe-ai-service'
import { addRecipe } from '@/services/recipe-service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  if (request.headers.get('x-api-key') !== process.env.API_KEY) {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    )
  }

  try {
    const body = await request.json()

    const recipe = await createNewRecipe(body.recipeTitle)
    const imagePath = await createRecipeImage(recipe)

    recipe.imagePath = imagePath

    const recipeWithImage = await addRecipe(recipe)

    return NextResponse.json(recipeWithImage, {
      status: 201,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'error on create recipe' },
      {
        status: 400,
      },
    )
  }
}
