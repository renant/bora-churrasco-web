"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostMetadata {
  title: string;
  slug: string;
  resume: string;
  coverImage: string;
  date: string;
  tags: string[];
}

interface RecipeMetadata {
  title: string;
  slug: string;
  imagePath: string;
  date: string;
}

interface SuggestedContentProps {
  type: "post-contents" | "recipe-contents";
  currentSlug?: string;
  count?: number;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

function getRandomItems<T>(array: T[], count: number, exclude?: string): T[] {
  const filteredArray = exclude 
    ? array.filter((item: any) => item.slug !== exclude)
    : array;
  
  const shuffled = [...filteredArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function loadContentMetadata(type: "post-contents" | "recipe-contents"): Promise<(PostMetadata | RecipeMetadata)[]> {
  try {
    const response = await fetch(`/api/content-metadata?type=${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error loading content metadata:", error);
    return [];
  }
}

export function SuggestedContent({ type, currentSlug, count = 3 }: SuggestedContentProps) {
  const [content, setContent] = useState<(PostMetadata | RecipeMetadata)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      const allContent = await loadContentMetadata(type);
      const randomContent = getRandomItems(allContent, count, currentSlug);
      setContent(randomContent);
      setIsLoading(false);
    }

    loadContent();
  }, [type, currentSlug, count]);

  const isPost = type === "post-contents";
  const titleText = isPost ? "📖 Posts Relacionados" : "🍖 Receitas Sugeridas";
  const subtitleText = isPost 
    ? "Descubra mais dicas e segredos para o churrasco perfeito" 
    : "Experimente essas deliciosas receitas em seu próximo churrasco";

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="space-y-6 sm:space-y-8">
          {/* Mobile-Optimized Header */}
          <div className="text-center space-y-2 sm:space-y-3 px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {titleText}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {subtitleText}
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Mobile-First Loading Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array(count).fill(null).map((_, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg bg-white backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="relative h-40 sm:h-48 bg-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-xl"></div>
                  </div>
                  <div className="p-3 sm:p-4 space-y-2">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (content.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {/* Mobile-Optimized Header */}
        <div className="text-center space-y-2 sm:space-y-3 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
            {titleText}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitleText}
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Mobile-First Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {content.map((item, index) => {
            const postItem = item as PostMetadata;
            const recipeItem = item as RecipeMetadata;
            
            return (
              <Link 
                key={item.slug} 
                href={isPost ? `/post/${item.slug}` : `/recipes/${item.slug}`}
                className="group block"
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white backdrop-blur-sm group-hover:bg-white transform hover:scale-[1.03] sm:hover:scale-105">
                  <CardContent className="p-0">
                    {/* Mobile-Optimized Image */}
                    <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                      <Image
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        src={isPost ? postItem.coverImage : recipeItem.imagePath}
                        alt={`${isPost ? "Post" : "Receita"}: ${item.title}`}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
                        quality={75}
                      />
                      {/* Mobile-Optimized Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Mobile-Friendly Badge */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>

                      {/* Content Type Badge */}
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                        <span className="px-2 py-1 sm:px-3 bg-orange-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                          {isPost ? "Post" : "Receita"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Mobile-Optimized Content */}
                    <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
                      {/* Date */}
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={item.date}>
                          {new Date(item.date).toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </time>
                      </div>
                      
                      {/* Title - Mobile Responsive */}
                      <h3 className="font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors duration-300 text-sm sm:text-base md:text-lg line-clamp-2">
                        {item.title}
                      </h3>
                      
                      {/* Resume for Posts - Mobile Optimized */}
                      {isPost && postItem.resume && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {postItem.resume}
                        </p>
                      )}
                      
                      {/* Call to Action - Mobile Friendly */}
                      <div className="flex items-center justify-between pt-1 sm:pt-2">
                        <span className="text-xs sm:text-sm font-medium text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                          {isPost ? "Ler post" : "Ver receita"}
                        </span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        
        {/* Mobile-Optimized CTA Button */}
        <div className="text-center px-4">
          <Link
            href={isPost ? "/blog" : "/recipes"}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <span>{isPost ? "Ver todos os posts" : "Ver todas as receitas"}</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}