import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section>
          <div className="text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
              <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                <h1 className="text-3xl md:text-5xl text-orange-300 tracking-loose">Bora Churrasco</h1>
                <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Seu app Android para calcular churrasco
                </h2>
                <p className="text-sm md:text-base text-gray-50 mb-4">Churrascômetro, uma calculadora ideal para para não deixa que seu churrasco falte nada.</p>
                <div className="flex flex-row justify-center content-center">
                  <div className="flex flex-col justify-center pr-4 min-w-[144px]">
                    <Link href="/assados"
                      className="bg-transparent hover:bg-orange-300 text-orange-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-orange-300 hover:border-transparent">
                      Teste online</Link>
                  </div>
                  <div className="flex flex-col justify-center pr-4 min-w-[144px]">
                    <a href='https://play.google.com/store/apps/details?id=io.ionic.bora.churras&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><Image width={150} height={150} alt='Disponível no Google Play' src='/google-play-badge.png' /></a>
                  </div>
                </div>
              </div>
              <div className="flex p-8  mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
                <div>
                  <Image className="inline-block md:mt-0 p-8 md:p-0" src="/app-sample.png" alt="Foto do aplicativo" width={300} height={200} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
