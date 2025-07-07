import { Users, Beef, Beer, Clock, Share } from "lucide-react";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: <Users className="h-6 w-6" />,
    title: "Informe os Participantes",
    description: "Adicione quantos homens, mulheres e crianças participarão do churrasco",
  },
  {
    number: "02",
    icon: <Beef className="h-6 w-6" />,
    title: "Escolha as Carnes",
    description: "Selecione entre diversas opções de carnes bovinas, suínas e aves",
  },
  {
    number: "03",
    icon: <Beer className="h-6 w-6" />,
    title: "Adicione as Bebidas",
    description: "Defina quais bebidas serão servidas: cervejas, refrigerantes, sucos e água",
  },
  {
    number: "04",
    icon: <Clock className="h-6 w-6" />,
    title: "Duração do Evento",
    description: "Informe quantas horas durará o churrasco para ajustar as quantidades",
  },
  {
    number: "05",
    icon: <Share className="h-6 w-6" />,
    title: "Receba sua Lista",
    description: "Veja o resultado detalhado e compartilhe a lista de compras com todos",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Como funciona nossa calculadora
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Em apenas 5 passos simples, você terá tudo calculado para seu churrasco. 
            Rápido, fácil e sem complicação.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-12 right-12 h-0.5 bg-gradient-to-r from-red-200 via-red-300 to-red-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Mobile connection line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-red-200 to-red-300" />
                )}
                
                <div className="relative bg-white rounded-2xl p-6 text-center group hover:shadow-lg transition-shadow duration-300">
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-4 mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}