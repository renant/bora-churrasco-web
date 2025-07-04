"use client";

import type {
  PostMetadata,
  SuggestedPostsProps,
} from "@/app/api/posts/random/route";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClientSuggestedPosts({
  excludeSlug,
  count = 3,
}: SuggestedPostsProps) {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts/random", {
        method: "POST",
        body: JSON.stringify({ count, excludeSlug }),
      });

      const data = await response.json();

      setPosts(data);
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
          <p className="text-gray-500">Carregando sugestões...</p>
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
          Continue explorando nosso conteúdo e torne-se um mestre do churrasco!
          🔥
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: PostMetadata) => (
          <Link href={`/post/${post.slug}`} key={post.slug} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white border-gray-200 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-3">
                  {post.resume}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                  <div className="relative z-0 h-32 w-full lg:h-32">
                    <Image
                      fill={true}
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="rounded-lg object-cover"
                      src={post.coverImage}
                      alt={`Foto da receita: ${post.title}`}
                      itemProp="image"
                      quality={90}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
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
    </section>
  );
}
