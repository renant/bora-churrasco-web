import type { Metadata } from "next";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { Hero } from "@/components/ui/hero";
import { Features } from "@/components/ui/features";
import { HowItWorks } from "@/components/ui/how-it-works";
import { Testimonials } from "@/components/ui/testimonials";
import { CTASection } from "@/components/ui/cta-section";
import { Guide } from "@/components/ui/guide";
import { Faq } from "@/components/ui/faq";

// Metadata específica para a página inicial
export const metadata: Metadata = {
  title: "Calculadora de Churrasco Online Grátis - Bora Churrasco!",
  description: "Calcule a quantidade exata de carne, bebidas e acompanhamentos para seu churrasco. Ferramenta 100% gratuita usada por mais de 50 mil pessoas. Evite desperdícios!",
  keywords: [
    "calculadora de churrasco",
    "calcular churrasco online",
    "quantidade de carne por pessoa",
    "planejar churrasco",
    "lista de compras churrasco",
    "app churrasco gratis",
    "bora churrasco",
  ],
  openGraph: {
    title: "Calculadora de Churrasco Online Grátis - Bora Churrasco!",
    description: "Planeje o churrasco perfeito! Calcule carnes, bebidas e acompanhamentos em segundos. 100% Grátis.",
    images: [
      {
        url: "/images/ms-icon-310x310.png",
        width: 310,
        height: 310,
        alt: "Bora Churrasco - Calculadora de Churrasco",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section - Above the fold */}
      <Hero />

      {/* Main content */}
      <main className="relative">
        {/* How it works section */}
        <HowItWorks />

        {/* Features section */}
        <Features />

        {/* Testimonials section */}
        <Testimonials />

        {/* SEO Content Section - Simplified */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <article className="prose prose-lg mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                A Calculadora de Churrasco mais completa do Brasil
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                O <strong className="text-gray-900">Bora Churrasco</strong> é a ferramenta definitiva para 
                planejar churrascos sem erro. Nossa calculadora considera o perfil dos seus convidados 
                (homens, mulheres e crianças), a duração do evento e suas preferências de carnes e bebidas 
                para gerar uma lista de compras precisa.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Por que usar nossa calculadora?
              </h3>
              
              <ul className="space-y-2 text-gray-600">
                <li>✓ <strong>Economia garantida:</strong> Compre apenas o necessário, sem desperdícios</li>
                <li>✓ <strong>Precisão comprovada:</strong> Algoritmo baseado em milhares de churrascos reais</li>
                <li>✓ <strong>Totalmente gratuita:</strong> Todas as funcionalidades sem custo algum</li>
                <li>✓ <strong>Fácil de usar:</strong> Interface intuitiva que qualquer pessoa consegue usar</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-8">
                <p className="text-sm text-amber-800">
                  <strong>Dica importante:</strong> Lembre-se de que fatores como horário do evento, 
                  clima e perfil dos convidados podem influenciar no consumo. Use nossa calculadora 
                  como base e ajuste conforme sua experiência.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />

        {/* Guide Section */}
        <Suspense fallback={<LoadingSection />}>
          <section className="py-16 sm:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <Guide />
            </div>
          </section>
        </Suspense>

        {/* FAQ Section */}
        <Suspense fallback={<LoadingSection />}>
          <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
              <Faq />
            </div>
          </section>
        </Suspense>
      </main>

      {/* Structured Data for SEO */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Bora Churrasco - Calculadora de Churrasco",
          description: "Calculadora online gratuita para planejar churrascos com precisão",
          url: "https://www.borachurrasco.app",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "486",
          },
          author: {
            "@type": "Organization",
            name: "Bora Churrasco",
          },
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: "Bora Churrasco App",
          operatingSystem: "Android",
          applicationCategory: "UtilitiesApplication",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "486",
          },
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Como calcular a quantidade de carne para churrasco?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Use nossa calculadora gratuita! Em média, calcule 400g por homem, 300g por mulher e 200g por criança. A calculadora ajusta automaticamente baseado no tempo do evento.",
              },
            },
            {
              "@type": "Question",
              name: "Quanto de carvão usar no churrasco?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A regra geral é 1,5kg de carvão para cada kg de carne. Para churrasqueiras a gás, não se preocupe com isso!",
              },
            },
            {
              "@type": "Question",
              name: "Como calcular bebidas para churrasco?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nossa calculadora considera: 1L de cerveja por hora/pessoa (que bebe), 600ml de refrigerante e 400ml de água por pessoa.",
              },
            },
            {
              "@type": "Question",
              name: "O app Bora Churrasco é gratuito?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim! O Bora Churrasco é 100% gratuito, tanto a versão web quanto o aplicativo Android. Todas as funcionalidades são liberadas sem custo.",
              },
            },
          ],
        }}
      />
    </>
  );
}

// Loading component for Suspense fallbacks
function LoadingSection() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent" />
    </div>
  );
}
