import Tempo from "@/enum/tempo-enum";
import AssadosCalculados from "@/models/assados-calculados";
import BebidasCalculadas from "@/models/bebidas-calculadas";
import EssenciaisCalculados from "@/models/essenciais-calculados";
import ValoresReferencia from "@/models/valores-referencia";

function somatorio(x: number): number {
  if (x === 1 || x === 0) {
    return 1;
  }
  return x + somatorio(x - 1);
}

export interface DefaultResultConfig {
  homens: number;
  mulheres: number;
  criancas: number;
  bovina: boolean;
  suina: boolean;
  linguica: boolean;
  frango: boolean;
  queijo: boolean;
  paoDeAlho: boolean;
  cerveja: boolean;
  refrigerante: boolean;
  agua: boolean;
  suco: boolean;
  tempo: Tempo;
  valorCarneHomem: number;
  valorCarneMulher: number;
  valorCarneCrianca: number;
  valorPaoDeAlho: number;
  cervejaPessoa: number;
  bebidasNaoAlcoolicas: number;
  valorAguaPessoa: number;
  valorSalGrosso: number;
  valorCarvao: number;
  valorGelo: number;
}

export interface CalculatedResult {
  assadosCalculados: AssadosCalculados;
  bebidasCalculadas: BebidasCalculadas;
  essenciaisCalculados: EssenciaisCalculados;
}

export function createDefaultResultConfig(participantes: number): DefaultResultConfig {
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
  };
}

function getValoresReferencia(config: DefaultResultConfig): ValoresReferencia {
  return new ValoresReferencia(
    config.valorCarneHomem,
    config.valorCarneMulher,
    config.valorCarneCrianca,
    config.valorPaoDeAlho,
    config.cervejaPessoa,
    config.bebidasNaoAlcoolicas,
    config.valorAguaPessoa
  );
}

function calcularAssados(
  config: DefaultResultConfig,
  ref: ValoresReferencia,
  totalParticipantes: number
): AssadosCalculados {
  const totalCarneHomem = config.homens * ref.valorCarneHomem;
  const totalCarneMulher = config.mulheres * ref.valorCarneMulher;
  const totalCarneCrianca = config.criancas * ref.valorCarneCrianca;

  const totalGramasCarne =
    totalCarneHomem + totalCarneMulher + totalCarneCrianca;

  const assadosList: string[] = [];

  if (config.bovina) assadosList.push("bovina");
  if (config.suina) assadosList.push("suina");
  if (config.linguica) assadosList.push("linguica");
  if (config.frango) assadosList.push("frango");
  if (config.queijo) assadosList.push("queijo");

  let totalSelecionado = assadosList.length;

  const auxDivisaoProporcional =
    totalGramasCarne / somatorio(totalSelecionado);

  const assados: { [key: string]: number } = {};

  for (const assado of assadosList) {
    assados[assado] = Math.round(auxDivisaoProporcional * totalSelecionado);
    totalSelecionado--;
  }

  if (config.paoDeAlho) {
    assados.paoAlho = Math.ceil(
      (totalParticipantes / 6) * config.valorPaoDeAlho
    );
  }

  return AssadosCalculados.fromMap(assados);
}

function calcularBebidas(
  config: DefaultResultConfig,
  totalParticipantes: number,
  totalAdultos: number
): BebidasCalculadas {
  const totalBebidasNaoAlcoolicas =
    totalParticipantes * config.bebidasNaoAlcoolicas;

  const bebidasList: string[] = [];

  if (config.refrigerante) bebidasList.push("refrigerante");
  if (config.suco) bebidasList.push("suco");

  let bebidasSelecionadas = bebidasList.length;
  const auxDivisaoProporcional =
    totalBebidasNaoAlcoolicas / somatorio(bebidasSelecionadas);

  const bebidas: { [key: string]: number } = {};

  for (const bebida of bebidasList) {
    bebidas[bebida] = Math.round(
      auxDivisaoProporcional * bebidasSelecionadas
    );
    bebidasSelecionadas--;
  }

  if (config.cerveja) {
    bebidas.cerveja = config.cervejaPessoa * totalAdultos;
  }

  if (config.agua) {
    bebidas.agua = config.valorAguaPessoa * totalParticipantes;
  }

  return BebidasCalculadas.fromMap(bebidas);
}

function calcularEssenciais(
  config: DefaultResultConfig,
  bebidasCalculadas: BebidasCalculadas,
  assadosCalculados: AssadosCalculados
): EssenciaisCalculados {
  const totalBebidas = bebidasCalculadas.getTotalBebidas();
  const totalGramasCarne = assadosCalculados.getTotalGramasCarne();

  return new EssenciaisCalculados({
    carvao: Math.ceil((totalGramasCarne / 5000) * config.valorCarvao),
    salGrosso: Math.ceil((totalGramasCarne / 10000) * config.valorSalGrosso),
    gelo: Math.round((totalBebidas / 1000) * config.valorGelo),
  });
}

export function calculateDefaultResult(
  participantes: number
): CalculatedResult {
  const config = createDefaultResultConfig(participantes);
  const totalParticipantes = config.homens;
  const totalAdultos = config.homens;

  const ref = getValoresReferencia(config);

  const assadosCalculados = calcularAssados(config, ref, totalParticipantes);
  const bebidasCalculadas = calcularBebidas(
    config,
    totalParticipantes,
    totalAdultos
  );
  const essenciaisCalculados = calcularEssenciais(
    config,
    bebidasCalculadas,
    assadosCalculados
  );

  return {
    assadosCalculados,
    bebidasCalculadas,
    essenciaisCalculados,
  };
}

