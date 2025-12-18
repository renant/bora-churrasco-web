import Tempo from "@/enum/tempo-enum";
import AssadosCalculados from "@/models/assados-calculados";
import BebidasCalculadas from "@/models/bebidas-calculadas";
import EssenciaisCalculados from "@/models/essenciais-calculados";
import ValoresReferencia from "@/models/valores-referencia";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

function somatorio(x: number): number {
  if (x === 1 || x === 0) {
    return 1;
  }
  return x + somatorio(x - 1);
}

// Storage key
const STORAGE_KEY = "bora-churrasco-progresso";

// 24 hours in milliseconds
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

type ChurrascoStore = {
  // Reference values
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
  
  // User inputs - persisted
  homens: number | undefined;
  mulheres: number | undefined;
  criancas: number | undefined;
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
  
  // Calculated values - not persisted
  salGrosso: number;
  carvao: number;
  gelo: number;
  totalGramasCarne: number;
  assadosCalculados: AssadosCalculados | undefined;
  bebidasCalculadas: BebidasCalculadas | undefined;
  essenciaisCalculados: EssenciaisCalculados | undefined;

  // Persistence metadata
  lastUpdated: number | undefined;

  // Validation methods
  temParticipantes: () => boolean;
  temAssados: () => boolean;
  temBebidas: () => boolean;
  
  // Check if there's valid saved progress
  hasSavedProgress: () => boolean;
  getCurrentStep: () => string;

  // Setters
  setHomens: (homens: number) => void;
  setMulheres: (mulheres: number) => void;
  setCriancas: (criancas: number) => void;
  setParticipantesFromUrl: (total: number) => void;

  changeBovina: () => void;
  changeSuina: () => void;
  changeLinguica: () => void;
  changeFrango: () => void;
  changeQueijo: () => void;
  changePaoDeAlho: () => void;

  changeCerveja: () => void;
  changeRefrigerante: () => void;
  changeAgua: () => void;
  changeSuco: () => void;

  createDefaultResult: (participantes: number) => void;

  setTempo: (tempo: Tempo) => void;

  getTempo: () => string;
  getMultiplicadorTempo: () => number;
  getValoresReferencia: (multiplicador: number) => ValoresReferencia;

  calcularAssados: (
    ref: ValoresReferencia,
    homens: number,
    mulheres: number,
    criancas: number,
    totalParticipantes: number
  ) => void;
  calcularBebidas: (totalParticipantes: number, totalAdultos: number) => void;
  calcularEssenciais: () => void;
  calcular: () => void;

  resetState: () => void;
  clearSavedProgress: () => void;
};

const initState = {
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
  homens: undefined,
  mulheres: undefined,
  criancas: undefined,
  bovina: false,
  suina: false,
  linguica: false,
  frango: false,
  queijo: false,
  paoDeAlho: false,
  cerveja: false,
  refrigerante: false,
  agua: false,
  suco: false,
  salGrosso: 0,
  carvao: 0,
  gelo: 0,
  tempo: Tempo.quatroHoras,
  totalGramasCarne: 0,
  assadosCalculados: undefined,
  bebidasCalculadas: undefined,
  essenciaisCalculados: undefined,
  lastUpdated: undefined,
};

const churrascoStore = create<ChurrascoStore>()(
  persist(
    (set, get) => ({
      ...initState,

      temParticipantes: () => {
        const homens = Number.isNaN(get().homens ?? 0) ? 0 : get().homens ?? 0;
        const mulheres = Number.isNaN(get().mulheres ?? 0)
          ? 0
          : get().mulheres ?? 0;
        const criancas = Number.isNaN(get().criancas ?? 0)
          ? 0
          : get().criancas ?? 0;

        return homens + mulheres + criancas > 0;
      },

      temAssados: () => {
        return (
          get().bovina ||
          get().suina ||
          get().linguica ||
          get().frango ||
          get().queijo ||
          get().paoDeAlho
        );
      },

      temBebidas: () => {
        return get().cerveja || get().refrigerante || get().agua || get().suco;
      },

      hasSavedProgress: () => {
        const lastUpdated = get().lastUpdated;
        if (!lastUpdated) return false;
        
        // Check if data is expired (older than 24 hours)
        const now = Date.now();
        if (now - lastUpdated > EXPIRATION_TIME) {
          // Data is expired, clear it
          get().clearSavedProgress();
          return false;
        }
        
        // Check if there's actual progress
        return get().temParticipantes();
      },

      getCurrentStep: () => {
        if (!get().temParticipantes()) return '/participantes';
        if (!get().temAssados()) return '/assados';
        if (!get().temBebidas()) return '/bebidas';
        return '/tempo';
      },

      getTempo: () => {
        const tempo = get().tempo;

        switch (tempo) {
          case Tempo.quatroHoras:
            return "4h";
          case Tempo.seisHoras:
            return "6h";
          case Tempo.oitoHoras:
            return "8h";
          case Tempo.dozeOuMaisHoras:
            return "12h ou mais";
          default:
            return "4h";
        }
      },

      setHomens: (homens: number) => set(() => ({ homens, lastUpdated: Date.now() })),
      setMulheres: (mulheres: number) => set(() => ({ mulheres, lastUpdated: Date.now() })),
      setCriancas: (criancas: number) => set(() => ({ criancas, lastUpdated: Date.now() })),
      setParticipantesFromUrl: (total: number) => {
        set(() => ({ homens: total, mulheres: 0, criancas: 0, lastUpdated: Date.now() }));
      },

      changeBovina: () => set(() => ({ bovina: !get().bovina, lastUpdated: Date.now() })),
      changeSuina: () => set(() => ({ suina: !get().suina, lastUpdated: Date.now() })),
      changeLinguica: () => set(() => ({ linguica: !get().linguica, lastUpdated: Date.now() })),
      changeFrango: () => set(() => ({ frango: !get().frango, lastUpdated: Date.now() })),
      changeQueijo: () => set(() => ({ queijo: !get().queijo, lastUpdated: Date.now() })),
      changePaoDeAlho: () => set(() => ({ paoDeAlho: !get().paoDeAlho, lastUpdated: Date.now() })),

      changeCerveja: () => set(() => ({ cerveja: !get().cerveja, lastUpdated: Date.now() })),
      changeRefrigerante: () => set(() => ({ refrigerante: !get().refrigerante, lastUpdated: Date.now() })),
      changeAgua: () => set(() => ({ agua: !get().agua, lastUpdated: Date.now() })),
      changeSuco: () => set(() => ({ suco: !get().suco, lastUpdated: Date.now() })),

      setTempo: (tempo: Tempo) => set(() => ({ tempo, lastUpdated: Date.now() })),

      createDefaultResult: (participantes: number) => {
        set(() => ({
          homens: participantes,
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
          lastUpdated: Date.now(),
        }));
      },

      resetState: () => {
        set(() => ({ ...initState }));
      },

      clearSavedProgress: () => {
        set(() => ({ ...initState }));
        // Also clear from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY);
        }
      },

      getMultiplicadorTempo: () => {
        const tempo = get().tempo;
        switch (tempo) {
          case Tempo.quatroHoras:
            return 1;
          case Tempo.seisHoras:
            return 1.2;
          case Tempo.oitoHoras:
            return 1.4;
          case Tempo.dozeOuMaisHoras:
            return 1.8;
          default:
            return 1;
        }
      },

      getValoresReferencia: (multiplicador: number) => {
        return new ValoresReferencia(
          Math.round(get().valorCarneHomem * multiplicador),
          Math.round(get().valorCarneMulher * multiplicador),
          Math.round(get().valorCarneCrianca * multiplicador),
          Math.round(get().valorPaoDeAlho * multiplicador),
          Math.round(get().cervejaPessoa * multiplicador),
          Math.round(get().bebidasNaoAlcoolicas * multiplicador),
          Math.round(get().valorAguaPessoa * multiplicador)
        );
      },

      calcularAssados: (
        ref: ValoresReferencia,
        homens: number,
        mulheres: number,
        criancas: number,
        totalParticipantes: number
      ) => {
        const totalCarneHomem = homens * ref.valorCarneHomem;
        const totalCarneMulher = mulheres * ref.valorCarneMulher;
        const totalCarneCrianca = criancas * ref.valorCarneCrianca;

        const totalGramasCarne =
          totalCarneHomem + totalCarneMulher + totalCarneCrianca;

        const assadosList = [];

        if (get().bovina) {
          assadosList.push("bovina");
        }
        if (get().suina) {
          assadosList.push("suina");
        }
        if (get().linguica) {
          assadosList.push("linguica");
        }
        if (get().frango) {
          assadosList.push("frango");
        }
        if (get().queijo) {
          assadosList.push("queijo");
        }

        let totalSelecionado = assadosList.length;

        const auxDivisaoProporcional =
          totalGramasCarne / somatorio(totalSelecionado);

        const assados: { [key: string]: number } = {};

        for (const assado of assadosList) {
          assados[assado] = Math.round(auxDivisaoProporcional * totalSelecionado);
          totalSelecionado--;
        }

        if (get().paoDeAlho) {
          assados.paoAlho = Math.ceil(
            (totalParticipantes / 6) * get().valorPaoDeAlho
          );
        }

        set(() => ({ assadosCalculados: AssadosCalculados.fromMap(assados) }));
      },

      calcularBebidas: (totalParticipantes: number, totalAdultos: number) => {
        const totalBebidasNaoAlcoolicas =
          get().bebidasNaoAlcoolicas * totalParticipantes;

        const bebidasList = [];

        if (get().refrigerante) {
          bebidasList.push("refrigerante");
        }

        if (get().suco) {
          bebidasList.push("suco");
        }

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

        if (get().cerveja) {
          bebidas.cerveja = get().cervejaPessoa * totalAdultos;
        }

        if (get().agua) {
          bebidas.agua = get().valorAguaPessoa * totalParticipantes;
        }

        set(() => ({ bebidasCalculadas: BebidasCalculadas.fromMap(bebidas) }));
      },

      calcularEssenciais() {
        const bebidasCalculadas = get().bebidasCalculadas?.getTotalBebidas() ?? 0;
        const totalGramasCarne =
          get().assadosCalculados?.getTotalGramasCarne() ?? 0;

        const essenciaisCalculados = new EssenciaisCalculados({
          carvao: Math.ceil((totalGramasCarne / 5000) * get().valorCarvao),
          salGrosso: Math.ceil((totalGramasCarne / 10000) * get().valorSalGrosso),
          gelo: Math.round((bebidasCalculadas / 1000) * get().valorGelo),
        });

        set(() => ({ essenciaisCalculados }));
      },

      calcular: () => {
        const homens = Number.isNaN(get().homens ?? 0) ? 0 : get().homens ?? 0;
        const mulheres = Number.isNaN(get().mulheres ?? 0)
          ? 0
          : get().mulheres ?? 0;
        const criancas = Number.isNaN(get().criancas ?? 0)
          ? 0
          : get().criancas ?? 0;

        const totalParticipantes = Math.round(homens + mulheres + criancas / 2);
        const totalAdultos = Math.round(homens + mulheres);

        const multiplicador = get().getMultiplicadorTempo();
        const ref = get().getValoresReferencia(multiplicador);

        get().calcularAssados(ref, homens, mulheres, criancas, totalParticipantes);
        get().calcularBebidas(totalParticipantes, totalAdultos);
        get().calcularEssenciais();
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist user input data, not calculated results
      partialState: (state) => ({
        homens: state.homens,
        mulheres: state.mulheres,
        criancas: state.criancas,
        bovina: state.bovina,
        suina: state.suina,
        linguica: state.linguica,
        frango: state.frango,
        queijo: state.queijo,
        paoDeAlho: state.paoDeAlho,
        cerveja: state.cerveja,
        refrigerante: state.refrigerante,
        agua: state.agua,
        suco: state.suco,
        tempo: state.tempo,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);

export default churrascoStore;
