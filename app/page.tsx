import JsonLd from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import Faq from '@/components/ui/faq';
import { Guide } from '@/components/ui/guide';
import appSampleImg from '@/public/app-sample.avif';
import { Beer, ChevronRight, Users, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="px-4 ">
      <section className="container mx-auto py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-700 font-medium text-sm">
              Calculadora de Churrasco
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-900 leading-tight">
              Seu app Android para calcular churrasco
            </h1>
            <p className="text-lg text-red-800/80">
              Calcule com precisão a quantidade ideal de carnes e bebidas para
              seu evento. Sem desperdícios, sem faltar nada.
            </p>
            <div className="flex flex-row items-center gap-4 pt-4">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white h-12 px-6"
                asChild
              >
                <Link href="/participantes">
                  Calcular Agora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <a
                href="https://play.google.com/store/apps/details?id=io.ionic.bora.churras&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                className="flex items-center"
              >
                <Image
                  width={168}
                  height={48}
                  alt="Disponível no Google Play"
                  src="/google-play-badge.avif"
                  className="h-12 w-auto"
                  priority
                />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-red-400 rounded-full filter blur-3xl opacity-20" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-400 rounded-full filter blur-3xl opacity-20" />
            <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-black/10 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 bg-red-100/10 rounded-full flex items-center justify-center">
                    <Utensils className="h-12 w-12 text-red-100" />
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Calculadora de Churrasco
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-red-100">
                      <Users className="h-5 w-5" />
                      <span>12 pessoas</span>
                    </div>
                    <div className="flex items-center gap-3 text-red-100">
                      <Utensils className="h-5 w-5" />
                      <span>4 tipos de carne</span>
                    </div>
                    <div className="flex items-center gap-3 text-red-100">
                      <Beer className="h-5 w-5" />
                      <span>Bebidas calculadas</span>
                    </div>
                    <Button
                      className="w-full bg-white text-red-700 hover:bg-red-50 mt-2"
                      asChild
                    >
                      <Link href="/participantes">Calcular Churrasco</Link>
                    </Button>
                  </div>
                </div>
                <Image
                  src={appSampleImg}
                  alt="App Screenshot"
                  width={300}
                  height={600}
                  className="absolute -right-16 -bottom-20 w-48 h-auto rounded-xl shadow-2xl border-4 border-white/20 rotate-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="prose prose-base mx-auto" id="content">
        <h2 className="text-red-500">
          Calculadora de Churrasco: Planeje Seu Evento com a Ferramenta do Bora
          Churrasco
        </h2>
        <p>
          Descobrir a quantidade certa de comida e bebida para um churrasco pode
          ser um verdadeiro desafio. Com a exclusiva{' '}
          <strong className="text-red-600">
            Calculadora de Churrasco do Bora Churrasco
          </strong>
          , nunca foi tão fácil acertar em cheio no cálculo e garantir que todos
          os seus convidados saiam satisfeitos. Acompanhe a seguir como nossa
          ferramenta inovadora em cinco passos pode revolucionar a maneira como
          você planeja seu churrasco:
        </p>

        <h3 className="text-red-500">Número de Participantes</h3>

        <p>
          O primeiro passo para um planejamento perfeito começa com o número
          exato de participantes. Nossa calculadora ajusta as proporções
          garantindo que haja abundância sem desperdícios.
        </p>

        <h3 className="text-red-500">Escolha de Carnes e Assados</h3>

        <p>
          No segundo passo, apresentamos uma variedade rica de carnes e assados,
          permitindo que você customise seu evento com opções que vão agradar a
          todos os gostos, desde os apreciadores dos cortes tradicionais até os
          amantes de novidades no mundo do churrasco.
        </p>

        <h3 className="text-red-500">Seleção de Bebidas</h3>

        <p>
          Um bom churrasco também pede uma seleção adequada de bebidas.
          Dependendo do perfil dos seus convidados e do tempo estimado do
          evento, ajudamos você a calcular tanto as opções alcoólicas quanto as
          não alcoólicas.
        </p>

        <h3 className="text-red-500">Tempo Estimado de Churrasco</h3>

        <p>
          Ajustar a quantidade de comida e bebida também depende do tempo que
          você planeja para o seu evento. Nosso sistema considera o tempo
          estimado do churrasco para garantir que todos estejam bem servidos do
          início ao fim com a ajuda da{' '}
          <strong className="text-red-600">calculadora de churrasco.</strong>
        </p>

        <h3 className="text-red-500">
          Resultado com Lista de Compras Compartilhável
        </h3>

        <p>
          Por fim, após inserir as informações necessárias, nossa calculadora
          gera uma lista de compras detalhada, incluindo tudo o que você
          precisará para o seu evento. O mais incrível? Você pode compartilhá-la
          facilmente com quem estiver ajudando nos preparativos, seja por e-mail
          ou aplicativos de mensagens.
        </p>

        <p>
          Com a{' '}
          <strong className="text-red-600">
            Calculadora de Churrasco do Bora Churrasco
          </strong>
          , o planejamento do seu evento fica mais simples e eficiente. Nossa
          ferramenta foi pensada para os entusiastas do churrasco que não querem
          se preocupar com complexos cálculos e preferem focar no que realmente
          importa: desfrutar de bons momentos ao lado de amigos e familiares.
        </p>

        <p>
          <strong className="text-red-600">Bora Churrasco</strong> não é apenas
          o destino para quem quer acertar no churrasco; é o começo de uma
          experiência inesquecível que começa com o planejamento. Explore agora
          nossa{' '}
          <a href="https://www.borachurrasco.app">Calculadora de Churrasco</a> e
          faça do seu próximo evento um sucesso absoluto!
        </p>

        <p>
          <strong className="text-red-600">Importante:</strong> Diversos fatores
          podem impactar o consumo estimado para o seu evento, incluindo o
          horário da realização, condições climáticas e outros aspectos
          relevantes.
        </p>
      </div>

      <Guide />
      <Faq />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Qual a quantidade de carne para um churrasco?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A quantidade de carne para um churrasco varia conforme o perfil dos convidados e o tempo estimado do evento. Em média, considera-se 400 gramas por homem e 300 gramas por mulher. Para crianças, a quantidade é de 200 gramas.',
              },
            },
            {
              '@type': 'Question',
              name: 'Como calcular a quantidade de carvão para um churrasco?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Uma boa regra é usar 1,5 kg de carvão para cada kg de carne. Isso pode variar conforme o tipo de churrasqueira e a duração do churrasco.',
              },
            },
            {
              '@type': 'Question',
              name: 'Quanto de acompanhamento calcular por pessoa no churrasco?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Recomenda-se calcular cerca de 150g de arroz, 150g de farofa e 100g de pão por pessoa. Para saladas, considere 100g por pessoa.',
              },
            },
            {
              '@type': 'Question',
              name: 'Como calcular bebidas para churrasco?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Calcule 1 litro de cerveja por hora por pessoa que bebe, 500ml de refrigerante por pessoa e 400ml de água por pessoa. Para um churrasco de 4 horas, multiplique esses valores.',
              },
            },
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Bora Churrasco - Calculadora de Churrasco',
          operatingSystem: 'Android',
          applicationCategory: 'UtilitiesApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'BRL',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '486',
          },
        }}
      />
    </main>
  );
}
