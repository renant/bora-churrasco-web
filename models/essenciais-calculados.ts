class EssenciaisCalculados {
  carvao: number = 0;
  salGrosso: number = 0;
  gelo: number = 0;


  constructor({
    carvao = 0,
    salGrosso = 0,
    gelo = 0,

  }: {
    carvao?: number;
    salGrosso?: number;
    gelo?: number;
  } = {}) {
    this.carvao = carvao ?? 0;
    this.salGrosso = salGrosso ?? 0;
    this.gelo = gelo ?? 0;

  }

  static fromMap(map: { [key: string]: number }): EssenciaisCalculados {
    return new EssenciaisCalculados({
      carvao: map['carvao'] ?? 0,
      salGrosso: map['salGrosso'] ?? 0,
      gelo: map['gelo'] ?? 0,
    });
  }

}

export default EssenciaisCalculados;
