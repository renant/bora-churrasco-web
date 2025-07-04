"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ClientSuggestedRecipesProps {
  excludeSlug?: string;
  count?: number;
}

interface RecipeMetadata {
  title: string;
  slug: string;
  imagePath: string;
  date: string;
}

// Lista estática de receitas para funcionar com páginas estáticas
const ALL_RECIPES: RecipeMetadata[] = [
  {
    title: "Picanha na Grelha",
    slug: "picanha-na-grelha",
    imagePath: "/images/picanha-grelha.jpg",
    date: "2024-01-10"
  },
  {
    title: "Costela no Bafo",
    slug: "costela-no-bafo",
    imagePath: "/images/costela-bafo.jpg",
    date: "2024-01-15"
  },
  {
    title: "Fraldinha Temperada",
    slug: "fraldinha-temperada",
    imagePath: "/images/fraldinha-temperada.jpg",
    date: "2024-01-20"
  },
  {
    title: "Alcatra Suculenta",
    slug: "alcatra-suculenta",
    imagePath: "/images/alcatra-suculenta.jpg",
    date: "2024-01-25"
  },
  {
    title: "Maminha Grelhada",
    slug: "maminha-grelhada",
    imagePath: "/images/maminha-grelhada.jpg",
    date: "2024-02-01"
  },
  {
    title: "Contrafilé Especial",
    slug: "contrafile-especial",
    imagePath: "/images/contrafile-especial.jpg",
    date: "2024-02-05"
  },
  {
    title: "Cupim Assado",
    slug: "cupim-assado",
    imagePath: "/images/cupim-assado.jpg",
    date: "2024-02-10"
  },
  {
    title: "Linguiça Artesanal",
    slug: "linguica-artesanal",
    imagePath: "/images/linguica-artesanal.jpg",
    date: "2024-02-15"
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ClientSuggestedRecipes({ excludeSlug, count = 6 }: ClientSuggestedRecipesProps) {
  const [recipes, setRecipes] = useState<RecipeMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filtrar receitas excluindo a atual
    const filteredRecipes = ALL_RECIPES.filter(recipe => recipe.slug !== excludeSlug);
    
    // Embaralhar e pegar a quantidade solicitada
    const shuffledRecipes = shuffleArray(filteredRecipes);
    const selectedRecipes = shuffledRecipes.slice(0, count);
    
    setRecipes(selectedRecipes);
    setIsLoading(false);
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
          Descubra sabores incríveis para deixar seu churrasco ainda mais especial! 🍖
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {recipes.map((recipe: RecipeMetadata) => (
          <Link href={`/recipes/${recipe.slug}`} key={recipe.slug} className="group">
            <div className="relative text-center transition-all duration-300 hover:scale-105">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={recipe.imagePath}
                  alt={`Foto da receita: ${recipe.title}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-3">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-lg line-clamp-2">
                    {recipe.title}
                  </h3>
                </div>
              </div>
            </div>
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