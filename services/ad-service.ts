const adsContent = [
  {
    link: 'https://go.hotmart.com/R88769488T',
    image: '/adsImages/transforme_seu_churrasco.avif',
    alt: 'Ebook Transforme seu churrasco',
    description: `Cansado de passar vergonha com CHURRASCO RUIM?

                  Chegou a hora de você transformar o seu churrasco, pessoas que já compraram o material, se surpreenderam e já tem gente faturando.
                  
                  São 80 receitas para você supreender a sua família e amigos e se desejar começar a faturar.`,
  },
  {
    link: 'https://go.hotmart.com/M88769544R',
    image: '/adsImages/curso_mestre_do_churrasco.avif',
    alt: 'Curso Mestre do Churrasco',
    description: `Torne-se um Mestre do Churrasco e descubra como fazer churrasco profissional!
    Curso em vídeo completo, 100% online, com passo a passo detalhado para fazer churrascos profissionais e deliciosos, mesmo que seja um iniciante no ramo.`,
  },
  {
    link: 'https://go.hotmart.com/B88803607A',
    image: '/adsImages/curso_espetinho.avif',
    alt: 'Curso Mestre do Espetinho',
    description: `Aprenda tudo que precisa para fazer os espetinhos mais deliciosos do mercado!
    Faça Espetinhos Artesanais com o Primeiro Curso em Vídeo que te revela todos os Bastidores para iniciar sua Produção e Venda (Inclusive Delivery) ainda essa semana.`,
  },
];

const getRandomAdsContent = () => {
  return adsContent[Math.floor(Math.random() * adsContent.length)];
};

export { getRandomAdsContent };
