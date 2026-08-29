/**
 * Conteúdo-base da campanha, extraído do documento
 * "Ulisses do Rodeio — Biografia, Trajetória e Bandeiras".
 *
 * Toda a copy do site vive aqui para que ajustes editoriais não exijam
 * mexer em componentes. Não adicionar projetos legislativos específicos:
 * o documento-base determina que só entrem após validação da equipe.
 */

export const candidato = {
  nome: "Ulisses do Rodeio",
  nomeCompleto: "Ulisses Garcia Machado",
  cargo: "Deputado Federal",
  numero: "7770",
  partido: "Solidariedade",
  estado: "São Paulo",
  slogan: "Presença no interior. Voz em Brasília.",
  cnpj: "68.312.635/0001-68",
  coligacao:
    "Coligação Federação Renovação Solidária – Solidariedade e PRD – Partido da Renovação Democrática",
  nascimento: {
    data: "11 de maio de 1990",
    cidade: "Marília",
    uf: "SP",
  },
} as const;

/** Ação de destaque do site: vira botão no header e no menu mobile. */
export const acaoPrincipal = {
  href: "#moldura",
  rotulo: "Faça sua foto 7770",
} as const;

export const navegacao = [
  { href: "#quem-e", rotulo: "Quem é" },
  { href: "#trajetoria", rotulo: "Trajetória" },
  { href: "#bandeiras", rotulo: "Bandeiras" },
  { href: "#parceria", rotulo: "Parceria" },
  { href: "#na-midia", rotulo: "Na Mídia" },
  { href: "#videos", rotulo: "Vídeos" },
  { href: "#por-que", rotulo: "Por que Ulisses" },
] as const;

export const hero = {
  chapeu: "Candidato a Deputado Federal • São Paulo",
  titulo: "Ulisses do Rodeio",
  linhaDeApoio:
    "Empresário e organizador de eventos, nascido no interior paulista. Agora, candidato a deputado federal para levar a realidade das cidades do interior até Brasília.",
  destaques: [
    { valor: "7770", rotulo: "Número na urna" },
    { valor: "Solidariedade", rotulo: "Partido" },
    { valor: "São Paulo", rotulo: "Estado" },
  ],
} as const;

export const moldura = {
  chapeu: "Apoie a campanha",
  titulo: "Coloque a moldura 7770 na sua foto",
  descricao:
    "Escolha uma foto do seu celular ou computador, ajuste o enquadramento e baixe a imagem pronta para publicar nas suas redes. Tudo acontece no seu aparelho — a foto não é enviada para lugar nenhum.",
  passos: [
    "Escolha a moldura",
    "Escolha uma foto",
    "Ajuste o zoom e arraste para enquadrar",
    "Baixe e publique marcando @ulissesdorodeio",
  ],
  arquivo: "ulisses-do-rodeio-7770.png",
  /**
   * `abertura` é o círculo que envolve o vazado de cada arte, medido em pixels
   * sobre o arquivo de 1080x1080. A foto é escalada e posicionada por ele.
   */
  artes: [
    {
      id: "eu-apoio",
      rotulo: "Ulisses do Rodeio",
      arquivo: "moldura-eu-apoio-7770",
      abertura: { cx: 525, cy: 504, raio: 468 },
    },
    {
      id: "vote",
      rotulo: "Ulisses do Rodeio e Waldir Filé",
      arquivo: "moldura-vote-7770",
      abertura: { cx: 578, cy: 464, raio: 392 },
    },
  ],
} as const;

export const quemE = {
  titulo: "Quem é Ulisses do Rodeio",
  paragrafos: [
    "Ulisses Garcia Machado, o Ulisses do Rodeio, nasceu em Marília, no interior de São Paulo, em 11 de maio de 1990.",
    "Empresário e organizador de eventos, construiu sua trajetória profissional no universo das festas de peão e dos grandes eventos regionais, trabalhando ao lado do pai, José Aparecido Machado, o Saru.",
    "Foi nesse caminho, percorrendo cidades, acompanhando trabalhadores, comerciantes, produtores e famílias do interior, que Ulisses conheceu de perto uma realidade que muitas vezes parece distante de Brasília.",
    "Hoje, coloca essa experiência a serviço de um novo desafio: representar São Paulo na Câmara dos Deputados.",
  ],
  ficha: [
    { rotulo: "Nome completo", valor: "Ulisses Garcia Machado" },
    { rotulo: "Nascimento", valor: "11 de maio de 1990, Marília (SP)" },
    { rotulo: "Atuação", valor: "Empresário e organizador de eventos" },
    { rotulo: "Candidatura", valor: "Deputado Federal • Solidariedade • 7770" },
  ],
} as const;

export const trajetoria = {
  titulo: "Trajetória",
  blocos: [
    {
      titulo: "Uma história que começou no interior",
      imagem: "/trajetoria-interior.jpg",
      imagemAlt:
        "Ulisses do Rodeio ao lado do pai, Saru, em evento do interior paulista",
      paragrafos: [
        "Antes da política, veio o trabalho.",
        "Ulisses cresceu em Marília e construiu sua vida profissional ligado aos eventos que movimentam cidades inteiras do interior paulista.",
        "Ao lado de seu pai, Saru, participou da organização de festas de peão e eventos regionais, convivendo diretamente com diferentes setores que fazem a economia do interior acontecer.",
        "Do campo ao comércio. Do pequeno empreendedor ao grande produtor. Do trabalhador que monta a estrutura ao público que movimenta a cidade.",
        "Foi vivendo essa realidade que surgiu o Ulisses do Rodeio. Não como personagem. Como identidade.",
      ],
    },
    {
      titulo: "Eventos que movimentam cidades",
      imagem: "/trajetoria-eventos.jpg",
      imagemAlt: "Ulisses do Rodeio em palco durante festa de peão",
      paragrafos: [
        "A organização de uma grande festa começa muito antes de o público chegar.",
        "Existe estrutura, logística, fornecedores, trabalhadores, alimentação, segurança, comércio, entretenimento e uma enorme cadeia de pessoas envolvidas.",
        "É nesse ambiente que Ulisses construiu sua experiência como empresário e organizador de eventos. Uma atividade que também lhe permitiu conhecer diferentes municípios e entender a força econômica das cidades do interior.",
      ],
    },
    {
      titulo: "Do rodeio para Brasília",
      imagem: "/trajetoria-brasilia.jpg",
      imagemAlt: "Ulisses do Rodeio com o chapéu nas mãos em arena de rodeio",
      paragrafos: [
        "Ulisses decidiu disputar uma cadeira de deputado federal com um objetivo claro: dar mais voz aos municípios do interior paulista.",
        "Sua candidatura pelo Solidariedade nasce da defesa de uma representação mais próxima das cidades, do agronegócio, dos trabalhadores e de quem produz e empreende longe dos grandes centros.",
      ],
    },
  ],
} as const;

export const cadeiaEconomica = {
  chamada: "Porque quando um evento acontece, não movimenta apenas uma arena.",
  itens: [
    "Hotéis",
    "Restaurantes",
    "Postos",
    "Comércio",
    "Prestadores de serviço",
    "Empregos e famílias inteiras",
  ],
  fecho: "Essa vivência faz parte da visão que Ulisses quer levar para Brasília.",
} as const;

export const citacao = {
  texto:
    "O interior não precisa ser lembrado apenas durante a eleição. Precisa ter presença onde as decisões são tomadas.",
  imagem: "/trajetoria-citacao.jpg",
  imagemAlt:
    "Ulisses do Rodeio discursa ao microfone ao lado de lideranças em evento no interior",
} as const;

export const bandeiras = {
  titulo: "Nossas bandeiras",
  subtitulo:
    "Cinco compromissos que orientam a candidatura de Ulisses do Rodeio na Câmara dos Deputados.",
  itens: [
    {
      titulo: "O interior",
      descricao:
        "Fortalecer os municípios do interior paulista e buscar mais espaço, investimentos e representação para cidades que ajudam São Paulo a crescer.",
    },
    {
      titulo: "Agro e produção",
      descricao:
        "Defender quem planta, produz, emprega e movimenta uma das maiores forças econômicas do país.",
    },
    {
      titulo: "Emprego e empreendedorismo",
      descricao:
        "Criar um ambiente que valorize quem trabalha, empreende e gera oportunidades.",
    },
    {
      titulo: "Eventos, turismo e economia regional",
      descricao:
        "Valorizar o setor de eventos como uma cadeia econômica capaz de gerar empregos, turismo, renda e desenvolvimento para os municípios.",
    },
    {
      titulo: "Municípios mais fortes",
      descricao:
        "Trabalhar para aproximar Brasília das necessidades reais das cidades, fortalecendo a capacidade dos municípios de oferecer serviços e melhorar a vida da população.",
    },
  ],
} as const;

export const parceria = {
  titulo: "Uma parceria pelo interior",
  paragrafos: [
    "Ulisses do Rodeio caminha ao lado de Waldir Filé, formando uma parceria que une a representação estadual e federal em defesa das cidades do interior paulista.",
    "A proposta é simples: somar forças, aproximar os municípios das decisões e trabalhar para que as demandas da nossa região tenham voz tanto em São Paulo quanto em Brasília.",
  ],
  duplas: [
    {
      nome: "Waldir Filé",
      cargo: "Deputado Estadual",
      numero: "777777",
    },
    {
      nome: "Ulisses do Rodeio",
      cargo: "Deputado Federal",
      numero: "7770",
    },
  ],
} as const;

export const porQue = {
  titulo: "Por que Ulisses?",
  abertura:
    "Porque representação começa por conhecer quem você quer representar.",
  destaque: "Ulisses conhece o interior não pelo discurso. Conhece pelo trabalho.",
  itens: [
    "Conhece os bastidores dos eventos.",
    "Conhece quem trabalha quando muita gente ainda está dormindo.",
    "Conhece os pequenos negócios.",
    "Conhece a força do campo.",
    "Conhece a economia das cidades do interior.",
  ],
  fecho: "Agora quer transformar essa experiência em representação.",
} as const;

export const naMidia = {
  titulo: "Na mídia",
  chamada: "Ulisses do Rodeio é notícia.",
  subtitulo:
    "Acompanhe reportagens, entrevistas e publicações sobre sua trajetória, sua candidatura e sua atuação pelo interior paulista.",
  destaques: {
    titulo: "Destaques da imprensa",
    descricao:
      "O que veículos de comunicação estão repercutindo sobre Ulisses e sua caminhada para representar o interior em Brasília.",
  },
  // Matérias publicadas de fato pelos veículos; imagens de capa baixadas das
  // próprias reportagens (exceto O Globo, que não publica capa própria).
  // `destaque` sobe a matéria para o topo da grade, ocupando as duas colunas.
  itens: [
    {
      veiculo: "Marília Notícia",
      titulo:
        "Ulisses e Waldir Filé se unem para garantir o crescimento da região de Marília",
      resumo:
        "Parceria entre as duas candidaturas reforça o compromisso com o desenvolvimento da região.",
      data: "2026-08-25",
      dataLegivel: "25 ago 2026",
      imagem: "/na-midia/marilia-waldir-file.jpg",
      url: "https://marilianoticia.com.br/ulisses-e-waldir-file-se-unem-para-garantir-o-crescimento-da-regiao-de-marilia/",
    },
    {
      veiculo: "Marília Notícia",
      titulo:
        "Compromisso político de Ulisses fortalece o agro e defende as tradições do campo",
      resumo:
        "Candidato defende o fortalecimento do agronegócio e as tradições do campo no interior paulista.",
      data: "2026-08-19",
      dataLegivel: "19 ago 2026",
      imagem: "/na-midia/marilia-compromisso-agro.jpg",
      url: "https://marilianoticia.com.br/compromisso-politico-de-ulisses-fortalece-o-agro-e-defende-as-tradicoes-do-campo/",
    },
    {
      veiculo: "Marília Notícia",
      titulo:
        "Ulisses do Rodeio projeta cultura do agronegócio regional em pauta nacional",
      resumo:
        "Empresário e organizador de eventos leva a cultura do agro regional ao debate nacional.",
      data: "2026-08-13",
      dataLegivel: "13 ago 2026",
      imagem: "/na-midia/marilia-cultura-agronegocio.jpg",
      url: "https://marilianoticia.com.br/ulisses-do-rodeio-projeta-cultura-do-agronegocio-regional-em-pauta-nacional/",
    },
    {
      veiculo: "Marília Notícia",
      titulo:
        "Empresário Ulisses do Rodeio oficializa candidatura à Câmara dos Deputados",
      resumo:
        "Candidatura a deputado federal pelo Solidariedade representa o agro e o interior paulista.",
      data: "2026-08-07",
      dataLegivel: "7 ago 2026",
      imagem: "/na-midia/marilia-oficializa-candidatura.jpg",
      url: "https://marilianoticia.com.br/empresario-ulisses-do-rodeio-oficializa-candidatura-a-camara-dos-deputados/",
    },
    {
      veiculo: "O Globo",
      titulo:
        "Ulisses do Rodeio: a força do interior no cenário do agronegócio nacional",
      resumo:
        "Do rodeio ao agro: a trajetória que levou o interior ao debate nacional.",
      data: "2026-07-21",
      dataLegivel: "21 jul 2026",
      imagem: "/trajetoria-brasilia.jpg",
      url: "https://oglobo.globo.com/patrocinado/pulse-brand/noticia/2026/07/21/ulisses-do-rodeio-a-forca-do-interior-no-cenario-do-agronegocio-nacional-1.ghtml",
      destaque: true,
    },
    {
      veiculo: "JP Jornal O Popular",
      titulo:
        "“Ubarana vai mostrar a força do interior”, destaca Ulisses do Rodeio sobre a grande festa de 2026",
      resumo:
        "Rodeio de Ubarana promete movimentar a economia com shows, montarias e tradição.",
      data: "2026-07-10",
      dataLegivel: "10 jul 2026",
      imagem: "/na-midia/jp-popular-ubarana.jpg",
      url: "https://jpopopular.com.br/2026/07/10/ubarana-vai-mostrar-a-forca-do-interior-destaca-ulisses-do-rodeio-sobre-a-grande-festa-de-2026/",
    },
    {
      veiculo: "Hora da Fama",
      titulo:
        "Ulisses do Rodeio desperta atenção política e surge como aposta jovem do Solidariedade",
      resumo:
        "Nome ligado ao agro e aos rodeios desponta como aposta jovem do partido em São Paulo.",
      data: "2026-05-21",
      dataLegivel: "21 mai 2026",
      imagem: "/na-midia/hora-da-fama-aposta-jovem.jpg",
      url: "https://horadafama.com.br/ulisses-do-rodeio-desperta-atencao-politica-e-surge-como-aposta-jovem-do-solidariedade/",
      destaque: true,
    },
  ],
  fecho: {
    linha1: "O interior ganhou espaço na conversa.",
    linha2: "Agora precisa ganhar voz em Brasília.",
  },
} as const;

export const videos = {
  titulo: "Vídeos",
  subtitulo:
    "Bastidores da campanha e da trajetória de Ulisses do Rodeio, direto do Instagram.",
  itens: [
    {
      titulo: "Quem acorda cedo e vai à luta",
      url: "https://www.instagram.com/p/Dcek4IatTWI/",
      thumbnail: "/videos/video-1.jpg",
    },
    {
      titulo: "Quem permanece",
      url: "https://www.instagram.com/p/DcSCG1cNLTj/",
      thumbnail: "/videos/video-2.jpg",
    },
    {
      titulo: "Parabéns, Saru",
      url: "https://www.instagram.com/p/DcE_cYCgX7c/",
      thumbnail: "/videos/video-3.jpg",
    },
    {
      titulo: "Terra Natal",
      url: "https://www.instagram.com/p/Dbl8avhvItU/",
      thumbnail: "/videos/video-terra-natal.jpg",
    },
    {
      titulo: "Cultura",
      url: "https://www.instagram.com/p/DZC_L6OBBS-/",
      thumbnail: "/videos/video-cultura.jpg",
    },
  ],
} as const;

export const redes = [
  {
    nome: "Instagram",
    usuario: "@ulissesdorodeio",
    url: "https://www.instagram.com/ulissesdorodeio",
  },
  {
    nome: "Facebook",
    usuario: "Ulisses do Rodeio",
    url: "https://www.facebook.com/share/1ceU7DfNEf/",
  },
] as const;

export const fontes = [
  {
    titulo:
      "Empresário Ulisses do Rodeio oficializa candidatura à Câmara dos Deputados",
    veiculo: "Marília Notícia",
    url: "https://marilianoticia.com.br/empresario-ulisses-do-rodeio-oficializa-candidatura-a-camara-dos-deputados/",
  },
  {
    titulo: "Publicação oficial da campanha",
    veiculo: "Instagram",
    url: "https://www.instagram.com/p/DbvZ8Iilj-m/",
  },
  {
    titulo: "7770 — Ulisses do Rodeio, deputado federal (SP)",
    veiculo: "ND Mais • Eleições 2026",
    url: "https://ndmais.com.br/eleicoes/2026/candidatos/sp/deputado-federal/7770-ulisses-do-rodeio/",
  },
  {
    titulo:
      "Ulisses do Rodeio: a voz autêntica que o agronegócio busca em meio à lacuna de representatividade",
    veiculo: "Globo Rural",
    url: "https://globorural.globo.com/conteudo-de-marca/pulse-brand/noticia/2026/07/ulisses-do-rodeio-a-voz-autentica-que-o-agronegocio-busca-em-meio-a-lacuna-de-representatividade-1.ghtml",
  },
] as const;
