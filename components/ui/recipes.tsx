"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Recipe from "@/models/recipe";
import { getRecipes } from "@/services/recipe-service";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";


export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMoreReciples, setHasMoreReciples] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const limitSize = 6;

  useEffect(() => {
    getRecipes({ limitSize }).then((newRecipes) => {
      setRecipes(newRecipes);
    });
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    const lastRecipe = recipes[recipes.length - 1];

    getRecipes({ limitSize, afterId: lastRecipe.id }).then((newRecipes) => {
      setRecipes([...recipes, ...newRecipes]);

      if (newRecipes.length < limitSize) {
        setHasMoreReciples(false);
      }

      setIsLoading(false);
    });
  }, [recipes]);

  return (
    <>
      <div className="mt-2 border-b border-orange-400"></div>
      <h4 className="text-3xl text-orange-400 font-extrabold md:px-24 mb-2 ">Receitas</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 md:px-24">
        {recipes.map((recipe) => (
          <Link key={recipe.id} className="hover:cursor-pointer" href={`recipes/${recipe.id}`}>
            <Card >
              <CardHeader>
                <CardTitle>
                  {recipe.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image className="rounded-md" alt={recipe.name} src={recipe.imagePath} width={1024} height={1024} />
              </CardContent>
              <CardFooter className="justify-between">
                <div>
                  <span className="text-orange-400 font-bold text-xs">{recipe.createdAt.toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-orange-400 font-bold text-xs">enviado por:</span>
                  <span className="text-orange-400 font-bold text-xs">{recipe.createdBy}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      {isLoading &&
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          </div>
        </div>}
      {!isLoading && !hasMoreReciples && <div className="flex flex-col items-center">
        <p className="text-orange-400 font-bold">Não há mais receitas para carregar</p>
      </div>
      }
      {!isLoading && hasMoreReciples && <button className="text-orange-400 font-bold" onClick={handleLoadMore}>
        <div className="flex flex-col items-center">
          <p>Carregar mais receitas</p>
          <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </div>
      </button>}
      <div className="mt-2 border-b border-orange-400"></div>
    </>
  )
}