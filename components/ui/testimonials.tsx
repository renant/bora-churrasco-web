import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Carlos Silva",
    role: "Churrasqueiro há 15 anos",
    content: "Uso o app toda vez que organizo um churrasco. Nunca mais errei nas quantidades!",
    rating: 5,
  },
  {
    name: "Ana Rodrigues",
    role: "Organizadora de eventos",
    content: "Perfeito para eventos grandes. A lista compartilhável facilita muito a organização.",
    rating: 5,
  },
  {
    name: "Pedro Santos",
    role: "Usuário frequente",
    content: "Simples, rápido e preciso. Economizei muito dinheiro evitando desperdícios.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            O que dizem nossos usuários
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mais de 50 mil pessoas já usam o Bora Churrasco para planejar seus eventos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={`star-${testimonial.name}-${i}`}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}