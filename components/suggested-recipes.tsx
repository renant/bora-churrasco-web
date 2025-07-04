import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

interface SuggestedRecipesProps {
  excludeSlug?: string;
  count?: number;
}

interface RecipeMetadata {
  title: string;
  slug: string;
  imagePath: string;
  date: string;
}

async function getRandomRecipes(count = 6, excludeSlug?: string): Promise<RecipeMetadata[]> {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), "recipe-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith('.mdx'))
      .filter((file: string) => excludeSlug ? !file.includes(excludeSlug) : true);
    
    // Shuffle array and take requested count
    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);
    
    const recipes: RecipeMetadata[] = [];
    
    for (const file of selectedFiles) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`@/recipe-contents/${file}`);
        if (mdxModule.metadata) {
          recipes.push({ ...mdxModule.metadata, slug });
        }
      } catch (error) {
        console.error(`Failed to load metadata for ${file}:`, error);
      }
    }
    
    return recipes;
  } catch (error) {
    console.error("Failed to get random recipes:", error);
    return [];
  }
}

export default async function SuggestedRecipes({ excludeSlug, count = 6 }: SuggestedRecipesProps) {
  const recipes = await getRandomRecipes(count, excludeSlug);

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

      {recipes.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Conteúdo sendo carregado...</p>
        </div>
      )}
    </section>
  );
}