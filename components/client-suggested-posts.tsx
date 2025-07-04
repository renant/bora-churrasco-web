"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ClientSuggestedPostsProps {
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

// Lista estática de posts para funcionar com páginas estáticas
const ALL_POSTS: PostMetadata[] = [
  {
    title: "Como Temperar a Carne do Churrasco Perfeito",
    slug: "como-temperar-carne-churrasco",
    coverImage: "/images/temperar-carne.jpg",
    resume: "Descubra os segredos para temperar sua carne e deixar seu churrasco inesquecível.",
    date: "2024-01-15",
    tags: ["Temperos", "Dicas"]
  },
  {
    title: "10 Cortes de Carne Indispensáveis para o Churrasco",
    slug: "cortes-carne-churrasco",
    coverImage: "/images/cortes-carne.jpg",
    resume: "Conheça os melhores cortes de carne para impressionar seus convidados.",
    date: "2024-01-20",
    tags: ["Cortes", "Guia"]
  },
  {
    title: "Segredos do Fogo: Como Controlar a Temperatura",
    slug: "controlar-temperatura-churrasqueira",
    coverImage: "/images/fogo-churrasqueira.jpg",
    resume: "Aprenda a dominar o fogo e conseguir o ponto perfeito em suas carnes.",
    date: "2024-01-25",
    tags: ["Fogo", "Técnicas"]
  },
  {
    title: "Acompanhamentos que Fazem a Diferença",
    slug: "acompanhamentos-churrasco",
    coverImage: "/images/acompanhamentos.jpg",
    resume: "Saladas, molhos e acompanhamentos para completar seu churrasco.",
    date: "2024-02-01",
    tags: ["Acompanhamentos", "Receitas"]
  },
  {
    title: "Cerveja e Churrasco: A Combinação Perfeita",
    slug: "cerveja-churrasco-combinacao",
    coverImage: "/images/cerveja-churrasco.jpg",
    resume: "Saiba como harmonizar diferentes tipos de cerveja com seu churrasco.",
    date: "2024-02-05",
    tags: ["Bebidas", "Harmonização"]
  },
  {
    title: "Churrasco para Iniciantes: Guia Completo",
    slug: "churrasco-iniciantes-guia",
    coverImage: "/images/iniciantes-churrasco.jpg",
    resume: "Tudo que você precisa saber para fazer seu primeiro churrasco perfeito.",
    date: "2024-02-10",
    tags: ["Iniciantes", "Guia"]
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

export default function ClientSuggestedPosts({ excludeSlug, count = 3 }: ClientSuggestedPostsProps) {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filtrar posts excluindo o atual
    const filteredPosts = ALL_POSTS.filter(post => post.slug !== excludeSlug);
    
    // Embaralhar e pegar a quantidade solicitada
    const shuffledPosts = shuffleArray(filteredPosts);
    const selectedPosts = shuffledPosts.slice(0, count);
    
    setPosts(selectedPosts);
    setIsLoading(false);
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
          Continue explorando nosso conteúdo e torne-se um mestre do churrasco! 🔥
        </p>
      </div>

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
    </section>
  );
}