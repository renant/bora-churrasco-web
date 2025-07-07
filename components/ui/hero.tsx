import { Button } from "@/components/ui/button";
import appSampleImg from "@/public/app-sample.avif";
import { Check, ChevronRight, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
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
      <div className="container relative mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="flex flex-col space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Churrasco perfeito{" "}
                <span className="text-red-600">sem complicação</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Calcule a quantidade ideal de carnes, bebidas e acompanhamentos
                para seu evento em segundos. Economize tempo e dinheiro com
                nossa calculadora inteligente.
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/25 transition-all"
                asChild
              >
                <Link href="/participantes">
                  Calcular Agora
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <a
                href="https://play.google.com/store/apps/details?id=io.ionic.bora.churras"
                className="inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={168}
                  height={56}
                  alt="Disponível no Google Play"
                  src="/google-play-badge.avif"
                  className="h-14 w-auto hover:opacity-90 transition-opacity"
                  priority
                  sizes="168px"
                />
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-gray-200">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:pr-8">
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
              <div className="absolute right-0 bottom-0 w-32 sm:w-40 transform rotate-12 hover:rotate-6 transition-transform duration-300">
                <Image
                  src={appSampleImg}
                  alt="Bora Churrasco App"
                  width={160}
                  height={320}
                  className="rounded-2xl shadow-2xl border-4 border-white"
                  priority
                  sizes="(max-width: 640px) 128px, 160px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
