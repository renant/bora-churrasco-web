class ValoresReferencia {
  valorCarneHomem: number;
  valorCarneMulher: number;
  valorCarneCrianca: number;
  valorPaoDeAlho: number;
  cervejaPessoa: number;
  bebidasNaoAlcoolicas: number;
  valorAguaPessoa: number;

  constructor(
    valorCarneHomem: number,
    valorCarneMulher: number,
    valorCarneCrianca: number,
    valorPaoDeAlho: number,
    cervejaPessoa: number,
    bebidasNaoAlcoolicas: number,
    valorAguaPessoa: number
  ) {
    this.valorCarneHomem = valorCarneHomem;
    this.valorCarneMulher = valorCarneMulher;
    this.valorCarneCrianca = valorCarneCrianca;
    this.valorPaoDeAlho = valorPaoDeAlho;
    this.cervejaPessoa = cervejaPessoa;
    this.bebidasNaoAlcoolicas = bebidasNaoAlcoolicas;
    this.valorAguaPessoa = valorAguaPessoa;
  }
}

export default ValoresReferencia;
