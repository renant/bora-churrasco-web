class BebidasCalculadas {
  cerveja = 0;
  refrigerante = 0;
  agua = 0;
  suco = 0;

  constructor({
    cerveja = 0,
    agua = 0,
    suco = 0,
    refrigerante = 0,
  }: {
    cerveja?: number;
    agua?: number;
    suco?: number;
    refrigerante?: number;
  } = {}) {
    this.cerveja = cerveja ?? 0;
    this.agua = agua ?? 0;
    this.suco = suco ?? 0;
    this.refrigerante = refrigerante ?? 0;
  }

  static fromMap(map: { [key: string]: number }): BebidasCalculadas {
    return new BebidasCalculadas({
      cerveja: map.cerveja ?? 0,
      agua: map.agua ?? 0,
      suco: map.suco ?? 0,
      refrigerante: map.refrigerante ?? 0,
    });
  }

  getTotalBebidas(): number {
    return this.cerveja + this.agua + this.suco + this.refrigerante;
  }
}

export default BebidasCalculadas;
