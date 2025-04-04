import Tempo from '@/enum/tempo-enum';
import AssadosCalculados from '@/models/assados-calculados';
import BebidasCalculadas from '@/models/bebidas-calculadas';
import EssenciaisCalculados from '@/models/essenciais-calculados';
import ValoresReferencia from '@/models/valores-referencia';
import Link from 'next/link';
import { Button, buttonVariants } from './button';

enum TipoMedida {
  peso = 0,
  liquido = 1,
}

function getMedida(value: number, tipo: TipoMedida) {
  switch (tipo) {
    case TipoMedida.peso: {
      return value >= 1000 ? `${value / 1000}kg` : `${value}g`;
    }
    case TipoMedida.liquido: {
      return value >= 1000 ? `${value / 1000}L` : `${value}ml`;
    }
  }
}
// Helper function: returns default result settings for given participantes
export function createDefaultResult(participantes: number) {
  return {
    homens: participantes,
    mulheres: 0,
    criancas: 0,
    bovina: true,
    suina: true,
    linguica: true,
    frango: true,
    queijo: true,
    paoDeAlho: true,
    cerveja: true,
    refrigerante: true,
    agua: true,
    suco: true,
    tempo: Tempo.quatroHoras,
    valorCarneHomem: 400,
    valorCarneMulher: 300,
    valorCarneCrianca: 200,
    valorPaoDeAlho: 400,
    cervejaPessoa: 1000,
    bebidasNaoAlcoolicas: 600,
    valorAguaPessoa: 200,
    valorSalGrosso: 1000,
    valorCarvao: 5000,
    valorGelo: 1000,
    assadosCalculados: new AssadosCalculados(),
    bebidasCalculadas: new BebidasCalculadas(),
    essenciaisCalculados: new EssenciaisCalculados(),
    somatorio(x: number): number {
      if (x === 1 || x === 0) {
        return 1;
      }
      return x + this.somatorio(x - 1);
    },
    calcular() {
      const totalParticipantes = this.homens;
      const totalAdultos = this.homens;

      const ref = this.getValoresReferencia();

      this.calcularAssados(ref, totalParticipantes);
      this.calcularBebidas(totalParticipantes, totalAdultos);
      this.calcularEssenciais();
    },
    getValoresReferencia() {
      return new ValoresReferencia(
        this.valorCarneHomem,
        this.valorCarneMulher,
        this.valorCarneCrianca,
        this.valorPaoDeAlho,
        this.cervejaPessoa,
        this.bebidasNaoAlcoolicas,
        this.valorAguaPessoa
      );
    },
    calcularAssados(ref: ValoresReferencia, totalParticipantes: number) {
      const totalCarneHomem = this.homens * ref.valorCarneHomem;
      const totalCarneMulher = this.mulheres * ref.valorCarneMulher;
      const totalCarneCrianca = this.criancas * ref.valorCarneCrianca;

      const totalGramasCarne =
        totalCarneHomem + totalCarneMulher + totalCarneCrianca;

      const assadosList = [];

      assadosList.push('bovina');
      assadosList.push('suina');
      assadosList.push('linguica');
      assadosList.push('frango');
      assadosList.push('queijo');

      let totalSelecionado = assadosList.length;

      const auxDivisaoProporcional =
        totalGramasCarne / this.somatorio(totalSelecionado);

      const assados: { [key: string]: number } = {};

      for (const assado of assadosList) {
        assados[assado] = Math.round(auxDivisaoProporcional * totalSelecionado);
        totalSelecionado--;
      }

      assados.paoAlho = Math.ceil(
        (totalParticipantes / 6) * this.valorPaoDeAlho
      );

      this.assadosCalculados = AssadosCalculados.fromMap(assados);
    },
    calcularBebidas(totalParticipantes: number, totalAdultos: number) {
      const totalBebidasNaoAlcoolicas =
        totalParticipantes * this.bebidasNaoAlcoolicas;

      const bebidasList = [];

      bebidasList.push('refrigerante');
      bebidasList.push('suco');

      let bebidasSelecionadas = bebidasList.length;
      const auxDivisaoProporcional =
        totalBebidasNaoAlcoolicas / this.somatorio(bebidasSelecionadas);

      const bebidas: { [key: string]: number } = {};

      for (const bebida of bebidasList) {
        bebidas[bebida] = Math.round(
          auxDivisaoProporcional * bebidasSelecionadas
        );
        bebidasSelecionadas--;
      }

      bebidas.cerveja = this.cervejaPessoa * totalAdultos;
      bebidas.agua = this.valorAguaPessoa * totalParticipantes;

      this.bebidasCalculadas = BebidasCalculadas.fromMap(bebidas);
    },
    calcularEssenciais() {
      const bebidasCalculadas = this.bebidasCalculadas.getTotalBebidas();
      const totalGramasCarne = this.assadosCalculados.getTotalGramasCarne();

      const essenciaisCalculados = new EssenciaisCalculados({
        carvao: Math.ceil((totalGramasCarne / 5000) * this.valorCarvao),
        salGrosso: Math.ceil((totalGramasCarne / 10000) * this.valorSalGrosso),
        gelo: Math.round((bebidasCalculadas / 1000) * this.valorGelo),
      });

      this.essenciaisCalculados = essenciaisCalculados;
    },
  };
}

interface ResultDefaultProps {
  participantes: number;
}

// Server component that uses createDefaultResult
export default function ResultDefault({ participantes }: ResultDefaultProps) {
  const defaultResult = createDefaultResult(participantes);

  defaultResult.calcular();

  const {
    bovina,
    suina,
    linguica,
    frango,
    queijo,
    paoDeAlho,
    cerveja,
    agua,
    refrigerante,
    suco,
    assadosCalculados,
    bebidasCalculadas,
    essenciaisCalculados,
  } = defaultResult;

  return (
    <div className="md:w-96 md:h-[610px] h-full">
      <div className="flex flex-col">
        <h2 className="mb-2 text-center text-lg leading-relaxed text-red-500 sm:text-4xl md:leading-snug">
          Lista de Compras!
        </h2>
        <h3 className="text-md mb-2 text-center leading-relaxed text-black md:text-lg md:leading-snug">
          Lembrando que o resultado é estimado para até 4h de comes e bebes
        </h3>
        <h4 className="md:text-md mb-2 text-center text-sm font-thin text-black md:leading-snug">
          (Isso é uma estimativa a quantidade pode variar, conheça seus
          convidados)
        </h4>
        <div className="mt-4 flex flex-col items-start">
          {assadosCalculados && (
            <div>
              <h5 className="text-md my-2 leading-relaxed text-black md:text-lg md:leading-snug">
                Assados
              </h5>
              <ul className="list-disc pl-8">
                {bovina && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Bovina:{' '}
                    {getMedida(assadosCalculados.bovina, TipoMedida.peso)}
                  </li>
                )}
                {suina && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Suina: {getMedida(assadosCalculados.suina, TipoMedida.peso)}
                  </li>
                )}
                {linguica && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Linguiça:{' '}
                    {getMedida(assadosCalculados.linguica, TipoMedida.peso)}
                  </li>
                )}
                {frango && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Frango:{' '}
                    {getMedida(assadosCalculados.frango, TipoMedida.peso)}
                  </li>
                )}
                {queijo && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Queijo:{' '}
                    {getMedida(assadosCalculados.queijo, TipoMedida.peso)}
                  </li>
                )}
                {paoDeAlho && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Pão de Alho:{' '}
                    {getMedida(assadosCalculados.paoAlho, TipoMedida.peso)}
                  </li>
                )}
              </ul>
            </div>
          )}

          {bebidasCalculadas && (
            <div>
              <h5 className="text-md my-2 leading-relaxed text-black md:text-lg md:leading-snug">
                Bebidas
              </h5>
              <ul className="list-disc pl-8">
                {cerveja && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Cerveja:{' '}
                    {getMedida(bebidasCalculadas.cerveja, TipoMedida.liquido)}
                  </li>
                )}
                {refrigerante && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Refrigerante:{' '}
                    {getMedida(
                      bebidasCalculadas.refrigerante,
                      TipoMedida.liquido
                    )}
                  </li>
                )}
                {agua && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Água:{' '}
                    {getMedida(bebidasCalculadas.agua, TipoMedida.liquido)}
                  </li>
                )}
                {suco && (
                  <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                    Suco:{' '}
                    {getMedida(bebidasCalculadas.suco, TipoMedida.liquido)}
                  </li>
                )}
              </ul>
            </div>
          )}

          {essenciaisCalculados && (
            <div>
              <h5 className="text-md my-2 leading-relaxed text-black md:text-lg md:leading-snug">
                Essenciais
              </h5>
              <ul className="list-disc pl-8">
                <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                  Sal Grosso:{' '}
                  {getMedida(essenciaisCalculados.salGrosso, TipoMedida.peso)}
                </li>
                <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                  Carvão:{' '}
                  {getMedida(essenciaisCalculados.carvao, TipoMedida.peso)}
                </li>
                <li className="md:text-md text-sm leading-relaxed text-black md:leading-snug">
                  Gelo: {getMedida(essenciaisCalculados.gelo, TipoMedida.peso)}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center pb-2">
        <Link href="/">
          <Button className={buttonVariants({ variant: 'outline' })}>
            {participantes && participantes > 0
              ? 'Calcule novamente com mais precisão'
              : 'Calcular novamente'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
