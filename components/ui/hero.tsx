import { Button } from "@/components/ui/button";
import appSampleImg from "@/public/app-sample.webp";
import { Check, ChevronRight, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  // Show fewer benefits on mobile - only first 2
  const benefits = [
    "Calcule quantidade exata de carnes",
    "Bebidas e acompanhamentos inclusos",
    "Lista de compras compartilhável",
    "Sem desperdício, sem faltar nada",
  ];

  const stats = [
    { value: "50K+", label: "Downloads" },
    { value: "4.8", label: "Avaliação" },
    { value: "100%", label: "Gratuito" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="container relative mx-auto px-4 py-8 sm:py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {/* Headline - More compact on mobile */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl">
                Churrasco perfeito{" "}
                <span className="text-red-600">sem complicação</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Calcule carnes, bebidas e acompanhamentos em segundos. 
                <span className="hidden sm:inline"> Economize tempo e dinheiro com nossa calculadora inteligente.</span>
              </p>
            </div>

            {/* Primary CTA - Above the fold on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto min-h-[56px] text-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/25 transition-all touch-manipulation"
                asChild
              >
                <Link href="/participantes">
                  Calcular Agora
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <a
                href="https://play.google.com/store/apps/details?id=io.ionic.bora.churras"
                className="hidden sm:inline-flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={168}
                  height={56}
                  alt="Disponível no Google Play"
                  src="/google-play-badge.webp"
                  className="h-12 sm:h-14 w-auto hover:opacity-90 transition-opacity"
                  priority
                  sizes="168px"
                />
              </a>
            </div>

            {/* Benefits - Show 2 on mobile, all on desktop */}
            <ul className="space-y-2 sm:space-y-3">
              {benefits.map((benefit, index) => (
                <li 
                  key={benefit} 
                  className={`flex items-center gap-2 sm:gap-3 ${index >= 2 ? 'hidden sm:flex' : ''}`}
                >
                  <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Social proof - Horizontal on mobile */}
            <div className="flex gap-6 sm:gap-8 pt-3 sm:pt-4 border-t border-gray-200">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Google Play badge - Show on mobile below stats */}
            <a
              href="https://play.google.com/store/apps/details?id=io.ionic.bora.churras"
              className="sm:hidden flex items-center justify-center py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={168}
                height={56}
                alt="Disponível no Google Play"
                src="/google-play-badge.webp"
                className="h-11 w-auto hover:opacity-90 transition-opacity"
                loading="lazy"
                sizes="168px"
              />
            </a>
          </div>

          {/* Visual - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:block relative lg:pr-8">
            <div className="relative mx-auto w-full max-w-lg">
              {/* Phone mockup background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 rounded-[3rem] transform rotate-3 scale-105" />
              <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl">
                <div className="rounded-[2.5rem] bg-gray-900 p-4">
                  {/* App preview */}
                  <div className="rounded-[2rem] bg-white p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Seu Churrasco
                      </h3>
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-red-600" />
                          <span className="text-sm font-medium">
                            Participantes
                          </span>
                        </div>
                        <span className="text-sm font-semibold">12</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-red-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-red-600">
                            4.8kg
                          </div>
                          <div className="text-xs text-gray-600">Carnes</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            12L
                          </div>
                          <div className="text-xs text-gray-600">Bebidas</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      asChild
                    >
                      <Link href="/participantes">
                        Calcular Agora
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating app screenshot */}
              <div className="absolute right-0 bottom-0 w-32 lg:w-40 transform rotate-12 hover:rotate-6 transition-transform duration-300">
                <Image
                  src={appSampleImg}
                  alt="Bora Churrasco App"
                  width={160}
                  height={320}
                  className="rounded-2xl shadow-2xl border-4 border-white"
                  loading="lazy"
                  sizes="(max-width: 1024px) 128px, 160px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
