import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 sm:p-12 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          
          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para o melhor churrasco da sua vida?
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-8">
              Junte-se a mais de 50 mil pessoas que já usam o Bora Churrasco 
              para planejar seus eventos com perfeição.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-red-700 hover:bg-gray-100 shadow-lg"
                asChild
              >
                <Link href="/participantes">
                  Começar Agora - É Grátis!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a
                  href="https://play.google.com/store/apps/details?id=io.ionic.bora.churras"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baixar App Android
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}