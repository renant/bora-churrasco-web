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
import churrascoStore from "@/lib/churrascoStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

interface ClientSuggestedPostsProps extends SuggestedPostsProps {
  useRelevanceFiltering?: boolean;
}

export default function ClientSuggestedPosts({
  excludeSlug,
  count = 3,
  useRelevanceFiltering = true,
}: ClientSuggestedPostsProps) {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get user selections from store to determine relevant keywords
  const {
    bovina,
    suina,
    linguica,
    frango,
    queijo,
    paoDeAlho,
    cerveja,
    refrigerante,
    agua,
    suco,
  } = churrascoStore();

  // Generate keywords based on user selections
  const keywords = useMemo(() => {
    if (!useRelevanceFiltering) return [];

    const keywordList: string[] = [];

    // Meat-related keywords
    if (bovina) {
      keywordList.push("carne", "bovina", "picanha", "alcatra", "costela", "maminha", "fraldinha");
    }
    if (suina) {
      keywordList.push("porco", "suina", "pernil", "lombo", "costelinha");
    }
    if (linguica) {
      keywordList.push("linguiça", "linguica", "calabresa");
    }
    if (frango) {
      keywordList.push("frango", "coração", "coxa", "asa");
    }
    if (queijo) {
      keywordList.push("queijo", "coalho", "provolone");
    }
    if (paoDeAlho) {
      keywordList.push("pão de alho", "pao de alho", "acompanhamento");
    }

    // Drink-related keywords
    if (cerveja) {
      keywordList.push("cerveja", "bebida", "drink", "harmonizar");
    }
    if (refrigerante || suco || agua) {
      keywordList.push("bebida", "drink", "refrescar");
    }

    // Always include some general churrasco keywords if we have any selection
    if (keywordList.length > 0) {
      keywordList.push("dica", "receita", "tempero", "preparo");
    }

    return keywordList;
  }, [bovina, suina, linguica, frango, queijo, paoDeAlho, cerveja, refrigerante, agua, suco, useRelevanceFiltering]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/posts/random", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            count, 
            excludeSlug,
            keywords: keywords.length > 0 ? keywords : undefined,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [excludeSlug, count, keywords]);

  if (isLoading) {
    return (
      <section className="w-full bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md border border-gray-200 mt-8 sm:mt-12">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Dicas para seu churrasco
          </h2>
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-r-transparent" />
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md border border-gray-200 mt-8 sm:mt-12">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
          Dicas para seu churrasco
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Aproveite essas dicas para deixar seu churrasco ainda melhor!
        </p>
      </div>

      {/* Mobile: Vertical list, Desktop: Grid */}
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6">
        {posts.map((post: PostMetadata) => (
          <Link href={`/post/${post.slug}`} key={post.slug} className="group block">
            <Card className="h-full transition-all duration-300 hover:shadow-lg sm:hover:scale-105 bg-white border-gray-200 overflow-hidden">
              {/* Mobile: Horizontal layout, Desktop: Vertical */}
              <div className="flex sm:flex-col">
                {/* Image - smaller on mobile */}
                <div className="relative w-24 h-24 sm:w-full sm:h-32 shrink-0">
                  <Image
                    fill
                    src={post.thumbWebp ?? ""}
                    alt={`Imagem do post ${post.title}`}
                    className="object-cover sm:rounded-t-lg"
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 hidden sm:block">
                    {post.resume}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 shadow-lg text-sm sm:text-base touch-manipulation"
        >
          Ver Todas as Dicas
        </Link>
      </div>
    </section>
  );
}
