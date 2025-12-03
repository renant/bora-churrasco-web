"use client";

import type {
  RecipeMetadata,
  SuggestedRecipesProps,
} from "@/app/api/recipes/random/route";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ClientSuggestedRecipes({
  excludeSlug,
  count = 3,
}: SuggestedRecipesProps) {
  const [recipes, setRecipes] = useState<RecipeMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/recipes/random", {
        method: "POST",
        body: JSON.stringify({ count, excludeSlug }),
      });

      const data = await response.json();

      setRecipes(data);
      setIsLoading(false);
    };

    fetchPosts();
  }, [excludeSlug, count]);

  if (isLoading) {
    return (
      <section className="w-full bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 mt-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Você também pode gostar
          </h2>
          <p className="text-gray-500">Carregando receitas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Você também pode gostar
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Descubra sabores incríveis para deixar seu churrasco ainda mais
          especial! 🍖
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: RecipeMetadata) => (
          <Link
            href={`/recipes/${recipe.slug}`}
            key={recipe.slug}
            className="group"
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white border-gray-200 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {recipe.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                  <div className="relative z-0 h-32 w-full lg:h-32">
                    <Image
                      fill
                      className="rounded-lg object-cover"
                      src={recipe.thumbWebp ?? ""}
                      alt={`Foto da receita: ${recipe.title}`}
                      sizes="100vw"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                  {" "}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
        >
          Ver Todas as Receitas
        </Link>
      </div>
    </section>
  );
}
