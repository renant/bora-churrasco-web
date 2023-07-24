import Tempo from '@/enum/tempo-enum';
import { create } from 'zustand';


type ChurrascoStore = {
  valorCarneHomem: number,
  valorCarneMulher: number,
  valorCarneCrianca: number,
  valorPaoDeAlho: number,
  cervejaPessoa: number,
  bebidasNaoAlcoolicas: number,
  valorAguaPessoa: number,
  valorSalGrosso: number,
  valorCarvao: number,
  valorGelo: number,
  homens: number | undefined,
  mulheres: number | undefined,
  criancas: number | undefined,
  temAssados: boolean,
  tembebidas: boolean,
  bovina: boolean,
  suina: boolean,
  linguica: boolean,
  frango: boolean,
  queijo: boolean,
  paoDeAlho: boolean,
  cerveja: boolean,
  refrigerante: boolean,
  agua: boolean,
  suco: boolean,
  salGrosso: number,
  carvao: number,
  gelo: number,
  tempo: Tempo,
  totalGramasCarne: number,

  temParticipantes: () => boolean,
  setHomens: (homens: number) => void,
  setMulheres: (mulheres: number) => void,
  setCriancas: (criancas: number) => void,
}

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
  temAssados: false,
  tembebidas: false,
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
}

const churrascoStore = create<ChurrascoStore>()((set, get) => ({
  ...initState,

  temParticipantes: () => {
    const homens = isNaN(get().homens ?? 0) ? 0 : get().homens ?? 0;
    const mulheres = isNaN(get().mulheres ?? 0) ? 0 : get().mulheres ?? 0;
    const criancas = isNaN(get().criancas ?? 0) ? 0 : get().criancas ?? 0;

    return homens + mulheres + criancas > 0;
  },

  setHomens: (homens: number) => set(() => ({ homens })),
  setMulheres: (mulheres: number) => set(() => ({ mulheres })),
  setCriancas: (criancas: number) => set(() => ({ criancas })),


}))

export default churrascoStore;
