import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function TestSuggestedPosts() {
  // Hardcoded test data to ensure rendering works
  const testPosts = [
    {
      slug: "bora-churrasco",
      title: "Bora Churrasco - A Ferramenta Essencial",
      resume: "O Bora Churrasco facilita festas de churrasco com comida e bebida para todos.",
      coverImage: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-08-05",
      tags: ["dicas"]
    },
    {
      slug: "como-organizar-um-churrasco-de-pascoa",
      title: "Como Organizar um Churrasco de Páscoa",
      resume: "Dicas especiais para organizar um churrasco perfeito na Páscoa.",
      coverImage: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-04-15",
      tags: ["eventos"]
    },
    {
      slug: "7-tecnicas-infaliveis-para-temperar-churrasco",
      title: "7 Técnicas Infalíveis para Temperar Churrasco",
      resume: "Aprenda as melhores técnicas para temperar sua carne e arrasar no churrasco.",
      coverImage: "https://firebasestorage.googleapis.com/v0/b/bora-churrasco.appspot.com/o/images-notion%2F0263671a-9715-42f8-b48d-81bb906f17b1?alt=media&token=e75e2b2f-cc35-4c6d-b3c3-65ea8b4a76b4",
      date: "2023-06-10",
      tags: ["temperos"]
    }
  ];

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
        {testPosts.map((post) => (
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