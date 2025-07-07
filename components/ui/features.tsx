import { Calculator, Share2, Clock, TrendingDown, Smartphone, CheckCircle2 } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Calculator className="h-6 w-6 text-red-600" />,
    title: "Cálculo Inteligente",
    description: "Algoritmo preciso que considera perfil dos convidados e duração do evento",
  },
  {
    icon: <Share2 className="h-6 w-6 text-red-600" />,
    title: "Lista Compartilhável",
    description: "Compartilhe a lista de compras via WhatsApp ou e-mail com um clique",
  },
  {
    icon: <Clock className="h-6 w-6 text-red-600" />,
    title: "Ajuste por Tempo",
    description: "Calcule quantidades extras para churrascos mais longos automaticamente",
  },
  {
    icon: <TrendingDown className="h-6 w-6 text-red-600" />,
    title: "Zero Desperdício",
    description: "Economize comprando apenas o necessário para seu evento",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-red-600" />,
    title: "Offline First",
    description: "Use o app mesmo sem internet, seus dados ficam sempre disponíveis",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-red-600" />,
    title: "100% Gratuito",
    description: "Todas as funcionalidades sem custo, sem anúncios invasivos",
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Tudo que você precisa para o churrasco perfeito
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa calculadora foi desenvolvida com base em anos de experiência e feedback 
            de milhares de usuários para garantir precisão em cada cálculo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="relative group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}