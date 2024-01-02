import { getRecipes } from '@/services/notion-blog-service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  if (request.headers.get('x-api-key') !== process.env.API_KEY) {
    return NextResponse.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    )
  }

  const recipes = await getRecipes()

  return NextResponse.json(recipes, {
    status: 200,
  })
}
