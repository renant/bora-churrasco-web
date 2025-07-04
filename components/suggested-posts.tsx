import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

interface SuggestedPostsProps {
  excludeSlug?: string;
  count?: number;
}

interface PostMetadata {
  title: string;
  slug: string;
  coverImage: string;
  resume: string;
  date: string;
  tags: string[];
}

async function getRandomPosts(count = 3, excludeSlug?: string): Promise<PostMetadata[]> {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), "post-contents"));
    const mdxFiles = files
      .filter((file: string) => file.endsWith('.mdx'))
      .filter((file: string) => excludeSlug ? !file.includes(excludeSlug) : true);
    
    // Shuffle array and take requested count
    const shuffled = mdxFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, count);
    
    const posts: PostMetadata[] = [];
    
    for (const file of selectedFiles) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`@/post-contents/${file}`);
        if (mdxModule.metadata) {
          posts.push({ ...mdxModule.metadata, slug });
        }
      } catch (error) {
        console.error(`Failed to load metadata for ${file}:`, error);
      }
    }
    
    return posts;
  } catch (error) {
    console.error("Failed to get random posts:", error);
    return [];
  }
}

export default async function SuggestedPosts({ excludeSlug, count = 3 }: SuggestedPostsProps) {
  const posts = await getRandomPosts(count, excludeSlug);

  return (
    <section className="w-full bg-white rounded-lg p-6 md:p-8 shadow-md border border-gray-200 mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Você também pode gostar
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Continue explorando nosso conteúdo e torne-se um mestre do churrasco! 🔥
        </p>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: PostMetadata) => (
              <Link href={`/post/${post.slug}`} key={post.slug} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white border-gray-200 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={`Imagem do post: ${post.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-3">
                      {post.resume}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                      {post.tags?.[0] && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg"
            >
              Ver Todas as Dicas
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