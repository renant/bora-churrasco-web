import Result from '@/components/ui/result';
import { getRandomAdsContent } from '@/services/ad-service';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const participante = parseInt(params.id)

  const url = `https://www.borachurrasco.app/resultado/${participante}`;


  return {
    title: `Cálculo De Churrasco Para ${participante} Pessoas`,
    description: `Lista de compras e calculo estimado para um churrasco de ${participante} pessoas`,
    alternates: {
      canonical: url,
    },
    keywords: ['Calculadora de Churraso', 'Churrasco', 'Calculadora'],
    images: [
      {
        url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
      },
    ],
    openGraph: {
      title: `Cálculo De Churrasco Para ${participante} Pessoas`,
      description: `Lista de compras e calculo estimado para um churrasco de ${participante} pessoas`,
      url: url,
      images: [
        {
          url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return [
    { id: '5' },
    { id: '10' },
    { id: '15' },
    { id: '20' },
    { id: '25' },
    { id: '30' },
    { id: '35' },
    { id: '40' },
    { id: '50' },
  ]
}

export default async function Resultado({
  params,
}: {
  params: { id: string }
}) {
  const participante = parseInt(params.id)

  const ads = await getRandomAdsContent()

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-16">
        <h1 className="mb-2 text-center text-lg leading-relaxed text-orange-300 sm:text-4xl md:leading-snug">
          Cálculo De Churrasco Para {participante} Pessoas
        </h1>
        <div className="flex flex-col  md:flex-row">
          <div className="flex flex-col pr-8">
            <Result participantes={participante} />
          </div>
          <div className="wrapper max-w-[300px] overflow-hidden rounded-b-md bg-gray-50  shadow-lg">
            <div>
              <Image src={ads.image} height={400} width={400} alt={ads.alt} />
            </div>
            <div className="p-3">
              <h3 className="text-md m-0 font-semibold text-gray-700">
                {ads.alt}
              </h3>
              <p className="leading-sm text-sm text-gray-900">
                {ads.description}
              </p>
            </div>
            <a href={ads.link} target="_blanck" className="no-underline">
              <button className="flex w-full justify-center bg-red-600 py-2 font-semibold text-white transition duration-300 hover:bg-red-500">
                Adquira já
              </button>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
