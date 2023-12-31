import { db } from '@/lib/firebase'
import Recipe from '@/models/recipe'
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

const addRecipe = async (recipe: Recipe) => {
  recipe.id = uuidv4()

  await addDoc(collection(db, 'recipes'), {
    id: recipe.id,
    name: recipe.name,
    imagePath: recipe.imagePath,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    active: recipe.active,
    createdAt: Timestamp.fromDate(recipe.createdAt),
  })

  return recipe
}

export type GetRecipesQuery = {
  limitSize?: number
  afterId?: string
}

const getRecipes = async (
  queryParam: GetRecipesQuery = {},
): Promise<Recipe[]> => {
  const recipesRef = collection(db, 'recipes')

  let q = query(
    recipesRef,
    where('active', '==', true),
    orderBy('createdAt', 'desc'),
  )

  if (queryParam.limitSize !== undefined)
    q = query(q, limit(queryParam.limitSize))

  if (queryParam.afterId !== undefined) {
    const lastQuery = query(
      recipesRef,
      where('id', '==', queryParam.afterId),
      limit(1),
    )
    const lastSnapshot = await getDocs(lastQuery)
    const last = lastSnapshot.docs[0]

    q = query(q, startAfter(last))
  }

  const snapshot = await getDocs(q)

  const recipes: any[] = []
  snapshot.forEach((doc) => {
    const data = doc.data()
    recipes.push({
      id: data.id,
      name: data.name,
      imagePath: data.imagePath,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,
      active: data.active,
      createdBy: data.createdBy,
    })
  })
  return recipes
}

const getRecipesExceptCurrent = async (id: string): Promise<Recipe[]> => {
  const recipesRef = collection(db, 'recipes')

  const recipes: any[] = []

  const q = query(
    recipesRef,
    where('id', '>=', id),
    where('id', '!=', id),
    orderBy('id'),
    limit(5),
  )
  const snapshot = await getDocs(q)

  snapshot.forEach((doc) => {
    const data = doc.data()
    recipes.push(
      new Recipe(
        data.id,
        data.name,
        data.imagePath,
        data.ingredients,
        data.steps,
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,
        data.active,
        data.createdBy,
        "",
        ""
      ),
    )
  })

  if (recipes.length < 5) {
    const q = query(
      recipesRef,
      where('id', '<=', id),
      where('id', '!=', id),
      orderBy('id'),
      limit(5 - recipes.length),
    )
    const snapshot = await getDocs(q)

    snapshot.forEach((doc) => {
      const data = doc.data()
      recipes.push(
        new Recipe(
          data.id,
          data.name,
          data.imagePath,
          data.ingredients,
          data.steps,
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : data.createdAt,
          data.active,
          data.createdBy,
          "",
          ""
        ),
      )
    })
  }

  return recipes
}

const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const recipesRef = collection(db, 'recipes')

  const q = query(recipesRef, where('id', '==', id), limit(1))
  const snapshot = await getDocs(q)

  let recipe: Recipe | null = null
  snapshot.forEach((doc) => {
    const data = doc.data()
    recipe = new Recipe(
      data.id,
      data.name,
      data.imagePath,
      data.ingredients,
      data.steps,
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : data.createdAt,
      data.active,
      data.createdBy,
      "",
      ""
    )
  })

  return recipe
}

export { addRecipe, getRecipeById, getRecipes, getRecipesExceptCurrent }
