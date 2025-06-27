import Tempo from "@/enum/tempo-enum";
import AssadosCalculados from "@/models/assados-calculados";
import BebidasCalculadas from "@/models/bebidas-calculadas";
import EssenciaisCalculados from "@/models/essenciais-calculados";
import ValoresReferencia from "@/models/valores-referencia";
import Link from "next/link";
import { Button, buttonVariants } from "./button";

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

      assadosList.push("bovina");
      assadosList.push("suina");
      assadosList.push("linguica");
      assadosList.push("frango");
      assadosList.push("queijo");

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

      bebidasList.push("refrigerante");
      bebidasList.push("suco");

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
    <div className="w-full max-w-md mx-auto">
      {/* Fixed dimensions container to prevent CLS */}
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px] border border-gray-200">
        <div className="flex flex-col h-full">
          <div className="text-center mb-6">
            <h2 className="mb-2 text-lg leading-relaxed text-red-500 sm:text-2xl md:text-3xl font-bold">
              Lista de Compras!
            </h2>
            <h3 className="text-sm md:text-base mb-2 text-center leading-relaxed text-gray-700">
              Lembrando que o resultado é estimado para até 4h de comes e bebes
            </h3>
            <h4 className="text-xs md:text-sm mb-4 text-center font-light text-gray-600">
              (Isso é uma estimativa a quantidade pode variar, conheça seus
              convidados)
            </h4>
          </div>

          <div className="flex-1 space-y-6">
            {assadosCalculados && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="text-lg md:text-xl font-semibold text-red-700 mb-3 flex items-center">
                  🥩 Assados
                </h5>
                <ul className="space-y-2">
                  {bovina && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Bovina:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados.bovina, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {suina && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Suína:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados.suina, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {linguica && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Linguiça:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados.linguica, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {frango && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Frango:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados.frango, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {queijo && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Queijo:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados.queijo, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                  {paoDeAlho && (
                    <li className="flex justify-between items-center py-1 border-b border-red-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Pão de Alho:</span>
                      <span className="text-sm md:text-base text-red-600 font-semibold">
                        {getMedida(assadosCalculados.paoAlho, TipoMedida.peso)}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {bebidasCalculadas && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="text-lg md:text-xl font-semibold text-blue-700 mb-3 flex items-center">
                  🍻 Bebidas
                </h5>
                <ul className="space-y-2">
                  {cerveja && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Cerveja:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas.cerveja, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                  {refrigerante && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Refrigerante:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas.refrigerante, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                  {agua && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Água:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas.agua, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                  {suco && (
                    <li className="flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                      <span className="text-sm md:text-base text-gray-700 font-medium">Suco:</span>
                      <span className="text-sm md:text-base text-blue-600 font-semibold">
                        {getMedida(bebidasCalculadas.suco, TipoMedida.liquido)}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {essenciaisCalculados && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="text-lg md:text-xl font-semibold text-green-700 mb-3 flex items-center">
                  ✨ Essenciais
                </h5>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center py-1 border-b border-green-100 last:border-b-0">
                    <span className="text-sm md:text-base text-gray-700 font-medium">Sal Grosso:</span>
                    <span className="text-sm md:text-base text-green-600 font-semibold">
                      {getMedida(essenciaisCalculados.salGrosso, TipoMedida.peso)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center py-1 border-b border-green-100 last:border-b-0">
                    <span className="text-sm md:text-base text-gray-700 font-medium">Carvão:</span>
                    <span className="text-sm md:text-base text-green-600 font-semibold">
                      {getMedida(essenciaisCalculados.carvao, TipoMedida.peso)}
                    </span>
                  </li>
                  <li className="flex justify-between items-center py-1 border-b border-green-100 last:border-b-0">
                    <span className="text-sm md:text-base text-gray-700 font-medium">Gelo:</span>
                    <span className="text-sm md:text-base text-green-600 font-semibold">
                      {getMedida(essenciaisCalculados.gelo, TipoMedida.peso)}
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link href="/" className="block">
              <Button 
                className={`${buttonVariants({ variant: "outline" })} w-full text-sm md:text-base py-3`}
              >
                {participantes && participantes > 0
                  ? "Calcule novamente com mais precisão"
                  : "Calcular novamente"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
