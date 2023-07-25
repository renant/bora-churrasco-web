class AssadosCalculados {
  bovina: number = 0;
  suina: number = 0;
  linguica: number = 0;
  frango: number = 0;
  queijo: number = 0;
  paoAlho: number = 0;

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

  toMap(): { [key: string]: number } {
    return {
      bovina: this.bovina,
      suina: this.suina,
      linguica: this.linguica,
      frango: this.frango,
      queijo: this.queijo,
      paoAlho: this.paoAlho,
    };
  }

  static fromMap(map: { [key: string]: number }): AssadosCalculados {
    return new AssadosCalculados({
      bovina: map['bovina'] ?? 0,
      suina: map['suina'] ?? 0,
      linguica: map['linguica'] ?? 0,
      frango: map['frango'] ?? 0,
      queijo: map['queijo'] ?? 0,
      paoAlho: map['paoAlho'] ?? 0,
    });
  }

  toJson(): string {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source: string): AssadosCalculados {
    return AssadosCalculados.fromMap(JSON.parse(source));
  }
}

export default AssadosCalculados;
