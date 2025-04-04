class AssadosCalculados {
  bovina = 0;
  suina = 0;
  linguica = 0;
  frango = 0;
  queijo = 0;
  paoAlho = 0;

  constructor({
    bovina = 0,
    suina = 0,
    linguica = 0,
    frango = 0,
    queijo = 0,
    paoAlho = 0,
  }: {
    bovina?: number;
    suina?: number;
    linguica?: number;
    frango?: number;
    queijo?: number;
    paoAlho?: number;
  } = {}) {
    this.bovina = bovina ?? 0;
    this.suina = suina ?? 0;
    this.linguica = linguica ?? 0;
    this.frango = frango ?? 0;
    this.queijo = queijo ?? 0;
    this.paoAlho = paoAlho ?? 0;
  }

  static fromMap(map: { [key: string]: number }): AssadosCalculados {
    return new AssadosCalculados({
      bovina: map.bovina ?? 0,
      suina: map.suina ?? 0,
      linguica: map.linguica ?? 0,
      frango: map.frango ?? 0,
      queijo: map.queijo ?? 0,
      paoAlho: map.paoAlho ?? 0,
    });
  }

  getTotalGramasCarne(): number {
    return this.bovina + this.suina + this.linguica + this.frango + this.queijo;
  }
}

export default AssadosCalculados;
