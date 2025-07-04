import { getRandomRecipes, type RecipeMetadata } from "@/utils/content-utils";
import { ChefHat, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SuggestedRecipesProps {
  excludeSlug?: string;
  count?: number;
}

export default async function SuggestedRecipes({ excludeSlug, count = 6 }: SuggestedRecipesProps) {
  const recipes = await getRandomRecipes(count, excludeSlug);

  if (!recipes.length) return null;

  return (
    <section className="w-full bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 shadow-lg border border-amber-100">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ChefHat className="h-8 w-8 text-orange-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 tracking-tight">
            Receitas que Vão Te Inspirar
          </h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Descubra sabores incríveis para deixar seu churrasco ainda mais especial! 🍖
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {recipes.map((recipe: RecipeMetadata) => (
          <Link href={`/recipes/${recipe.slug}`} key={recipe.slug} className="group">
            <div className="relative text-center transition-all duration-300 hover:scale-105">
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={recipe.imagePath}
                  alt={`Foto da receita: ${recipe.title}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-3">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-lg line-clamp-2">
                    {recipe.title}
                  </h3>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChefHat className="h-3 w-3 text-orange-500" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link 
          href="/recipes" 
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <ChefHat className="h-4 w-4" />
          Ver Todas as Receitas
        </Link>
      </div>
    </section>
  );
}