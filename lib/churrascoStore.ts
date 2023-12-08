import Tempo from '@/enum/tempo-enum'
import AssadosCalculados from '@/models/assados-calculados'
import BebidasCalculadas from '@/models/bebidas-calculadas'
import EssenciaisCalculados from '@/models/essenciais-calculados'
import ValoresReferencia from '@/models/valores-referencia'
import { create } from 'zustand'

function somatorio(x: number): number {
  if (x === 1 || x === 0) {
    return 1
  } else {
    return x + somatorio(x - 1)
  }
}

type ChurrascoStore = {
  valorCarneHomem: number
  valorCarneMulher: number
  valorCarneCrianca: number
  valorPaoDeAlho: number
  cervejaPessoa: number
  bebidasNaoAlcoolicas: number
  valorAguaPessoa: number
  valorSalGrosso: number
  valorCarvao: number
  valorGelo: number
  homens: number | undefined
  mulheres: number | undefined
  criancas: number | undefined
  bovina: boolean
  suina: boolean
  linguica: boolean
  frango: boolean
  queijo: boolean
  paoDeAlho: boolean
  cerveja: boolean
  refrigerante: boolean
  agua: boolean
  suco: boolean
  salGrosso: number
  carvao: number
  gelo: number
  tempo: Tempo
  totalGramasCarne: number
  assadosCalculados: AssadosCalculados | undefined
  bebidasCalculadas: BebidasCalculadas | undefined
  essenciaisCalculados: EssenciaisCalculados | undefined

  temParticipantes: () => boolean
  temAssados: () => boolean
  temBebidas: () => boolean

  setHomens: (homens: number) => void
  setMulheres: (mulheres: number) => void
  setCriancas: (criancas: number) => void

  changeBovina: () => void
  changeSuina: () => void
  changeLinguica: () => void
  changeFrango: () => void
  changeQueijo: () => void
  changePaoDeAlho: () => void

  changeCerveja: () => void
  changeRefrigerante: () => void
  changeAgua: () => void
  changeSuco: () => void

  createDefaultResult: (participantes: number) => void

  setTempo: (tempo: Tempo) => void

  getTempo: () => string
  getMultiplicadorTempo: () => number
  getValoresReferencia: (multiplicador: number) => ValoresReferencia

  calcularAssados: (
    ref: ValoresReferencia,
    homens: number,
    mulheres: number,
    criancas: number,
    totalParticipantes: number,
  ) => void
  calcularBebidas: (totalParticipantes: number, totalAdultos: number) => void
  calcularEssenciais: () => void
  calcular: () => void

  resetState: () => void
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
}

const churrascoStore = create<ChurrascoStore>()((set, get) => ({
  ...initState,

  temParticipantes: () => {
    const homens = isNaN(get().homens ?? 0) ? 0 : get().homens ?? 0
    const mulheres = isNaN(get().mulheres ?? 0) ? 0 : get().mulheres ?? 0
    const criancas = isNaN(get().criancas ?? 0) ? 0 : get().criancas ?? 0

    return homens + mulheres + criancas > 0
  },

  temAssados: () => {
    return (
      get().bovina ||
      get().suina ||
      get().linguica ||
      get().frango ||
      get().queijo ||
      get().paoDeAlho
    )
  },

  temBebidas: () => {
    return get().cerveja || get().refrigerante || get().agua || get().suco
  },

  getTempo: () => {
    const tempo = get().tempo

    switch (tempo) {
      case Tempo.quatroHoras:
        return '4h'
      case Tempo.seisHoras:
        return '6h'
      case Tempo.oitoHoras:
        return '8h'
      case Tempo.dozeOuMaisHoras:
        return '12h ou mais'
      default:
        return '4h'
    }
  },

  setHomens: (homens: number) => set(() => ({ homens })),
  setMulheres: (mulheres: number) => set(() => ({ mulheres })),
  setCriancas: (criancas: number) => set(() => ({ criancas })),

  changeBovina: () => set(() => ({ bovina: !get().bovina })),
  changeSuina: () => set(() => ({ suina: !get().suina })),
  changeLinguica: () => set(() => ({ linguica: !get().linguica })),
  changeFrango: () => set(() => ({ frango: !get().frango })),
  changeQueijo: () => set(() => ({ queijo: !get().queijo })),
  changePaoDeAlho: () => set(() => ({ paoDeAlho: !get().paoDeAlho })),

  changeCerveja: () => set(() => ({ cerveja: !get().cerveja })),
  changeRefrigerante: () => set(() => ({ refrigerante: !get().refrigerante })),
  changeAgua: () => set(() => ({ agua: !get().agua })),
  changeSuco: () => set(() => ({ suco: !get().suco })),

  setTempo: (tempo: Tempo) => set(() => ({ tempo })),

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
    }))
  },

  resetState: () => {
    set(() => ({ ...initState }))
  },

  getMultiplicadorTempo: () => {
    const tempo = get().tempo
    switch (tempo) {
      case Tempo.quatroHoras:
        return 1
      case Tempo.seisHoras:
        return 1.2
      case Tempo.oitoHoras:
        return 1.4
      case Tempo.dozeOuMaisHoras:
        return 1.8
      default:
        return 1
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
      Math.round(get().valorAguaPessoa * multiplicador),
    )
  },

  calcularAssados: (
    ref: ValoresReferencia,
    homens: number,
    mulheres: number,
    criancas: number,
    totalParticipantes: number,
  ) => {
    const totalCarneHomem = homens * ref.valorCarneHomem
    const totalCarneMulher = mulheres * ref.valorCarneMulher
    const totalCarneCrianca = criancas * ref.valorCarneCrianca

    const totalGramasCarne =
      totalCarneHomem + totalCarneMulher + totalCarneCrianca

    const assadosList = []

    if (get().bovina) {
      assadosList.push('bovina')
    }
    if (get().suina) {
      assadosList.push('suina')
    }
    if (get().linguica) {
      assadosList.push('linguica')
    }
    if (get().frango) {
      assadosList.push('frango')
    }
    if (get().queijo) {
      assadosList.push('queijo')
    }

    let totalSelecionado = assadosList.length

    const auxDivisaoProporcional =
      totalGramasCarne / somatorio(totalSelecionado)

    const assados: { [key: string]: number } = {}

    assadosList.forEach((assado) => {
      assados[assado] = Math.round(auxDivisaoProporcional * totalSelecionado)
      totalSelecionado--
    })

    if (get().paoDeAlho) {
      assados.paoAlho = Math.ceil(
        (totalParticipantes / 6) * get().valorPaoDeAlho,
      )
    }

    set(() => ({ assadosCalculados: AssadosCalculados.fromMap(assados) }))
  },

  calcularBebidas: (totalParticipantes: number, totalAdultos: number) => {
    const totalBebidasNaoAlcoolicas =
      get().bebidasNaoAlcoolicas * totalParticipantes

    const bebidasList = []

    if (get().refrigerante) {
      bebidasList.push('refrigerante')
    }

    if (get().suco) {
      bebidasList.push('suco')
    }

    let bebidasSelecionadas = bebidasList.length

    const auxDivisaoProporcional =
      totalBebidasNaoAlcoolicas / somatorio(bebidasSelecionadas)

    const bebidas: { [key: string]: number } = {}

    bebidasList.forEach((bebida) => {
      bebidas[bebida] = Math.round(auxDivisaoProporcional * bebidasSelecionadas)
      bebidasSelecionadas--
    })

    if (get().cerveja) {
      bebidas.cerveja = get().cervejaPessoa * totalAdultos
    }

    if (get().agua) {
      bebidas.agua = get().valorAguaPessoa * totalParticipantes
    }

    set(() => ({ bebidasCalculadas: BebidasCalculadas.fromMap(bebidas) }))
  },

  calcularEssenciais() {
    const bebidasCalculadas = get().bebidasCalculadas!.getTotalBebidas()
    const totalGramasCarne = get().assadosCalculados!.getTotalGramasCarne()

    const essenciaisCalculados = new EssenciaisCalculados({
      carvao: Math.ceil((totalGramasCarne / 5000) * get().valorCarvao),
      salGrosso: Math.ceil((totalGramasCarne / 10000) * get().valorSalGrosso),
      gelo: Math.round((bebidasCalculadas / 1000) * get().valorGelo),
    })

    set(() => ({ essenciaisCalculados }))
  },

  calcular: () => {
    const homens = isNaN(get().homens ?? 0) ? 0 : get().homens ?? 0
    const mulheres = isNaN(get().mulheres ?? 0) ? 0 : get().mulheres ?? 0
    const criancas = isNaN(get().criancas ?? 0) ? 0 : get().criancas ?? 0

    const totalParticipantes = Math.round(homens + mulheres + criancas / 2)
    const totalAdultos = Math.round(homens + mulheres)

    const multiplicador = get().getMultiplicadorTempo()
    const ref = get().getValoresReferencia(multiplicador)

    get().calcularAssados(ref, homens, mulheres, criancas, totalParticipantes)
    get().calcularBebidas(totalParticipantes, totalAdultos)
    get().calcularEssenciais()
  },
}))

export default churrascoStore
