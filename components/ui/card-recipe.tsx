import Recipe from '@/models/recipe'
import Image from 'next/image'
import Link from 'next/link'

interface CardRecipeProps {
  recipe: Recipe | undefined
}

export async function CardRecipe({ recipe }: CardRecipeProps) {
  if (!recipe) return null

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="relative w-32 text-center md:w-full">
        <Image
          className="overflow-hidden rounded-3xl opacity-70 shadow-xl"
          src={recipe.imagePath}
          alt={`Foto da receita: ${recipe.name}`}
          width={200}
          height={200}
        />
        <h3 className="custom-centered text-sm font-extrabold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-lg">
          {recipe.name}
        </h3>
      </div>
    </Link>
  )
}
