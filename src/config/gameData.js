export const DAY_COST_INVESTIGATE = 0.5;
export const DAY_COST_TRAVEL = 1.0;

// Difficulty levels — each alters days available, route length and clue quality
export const DIFFICULTIES = {
  rookie: {
    id: 'rookie',
    label: 'Agente Recruta',
    subtitle: 'Primeira missão em campo',
    description: 'Rota curta, prazo generoso e pistas claras. Ideal para aprender as mecânicas.',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.25)',
    border: 'rgba(34,197,94,0.4)',
    icon: '🟢',
    badge: 'INICIANTE',
    days: 10,
    pathLength: 2,   // the villain hides after 2 cities
    clueChance: 0.8, // 80% chance of a geographic/cultural clue vs villain trait
  },
  field: {
    id: 'field',
    label: 'Detetive de Campo',
    subtitle: 'Missão padrão INTERPOL',
    description: 'Equilíbrio entre tempo e dificuldade. O padrão das operações INTERPOL.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.2)',
    border: 'rgba(245,158,11,0.4)',
    icon: '🟡',
    badge: 'INTERMEDIÁRIO',
    days: 7,
    pathLength: 3,
    clueChance: 0.6,
  },
  elite: {
    id: 'elite',
    label: 'Operação de Elite',
    subtitle: 'Classificação: ALTO SECRETO',
    description: 'Prazo crítico, rota longa e pistas deliberadamente vagas. Apenas os melhores sobrevivem.',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.2)',
    border: 'rgba(239,68,68,0.4)',
    icon: '🔴',
    badge: 'DIFÍCIL',
    days: 5,
    pathLength: 4,
    clueChance: 0.35, // mostly villain traits, harder to track
  },
};

export const VILLAINS = [
  {
    name: "Carmen Vermelha", gender: "Feminino", hair: "Preto", auto: "Conversível", feature: "Colar de Rubi", image: "/assets/images/villains/carmen.png",
    lore: "Ex-espiã corporativa que decidiu usar suas habilidades para roubar artefatos inestimáveis. Elegante, letal e sempre um passo à frente da Interpol.",
    personality: "arrogante",
    quirk: "Sempre deixa uma rosa vermelha com as pétalas cortadas no local do crime."
  },
  {
    name: "Barão Bomba", gender: "Masculino", hair: "Loiro", auto: "Limousine", feature: "Tatuagem", image: "/assets/images/villains/barao.png",
    lore: "Líder de um sindicato do crime na Europa Oriental. Usa força bruta, mas também possui um intelecto afiado para lavagem de dinheiro em paraísos fiscais.",
    personality: "agressivo",
    quirk: "Bebe apenas vodka envelhecida e exige ser chamado pelo seu título de nobreza fajuto."
  },
  {
    name: "Lady Lâmina", gender: "Feminino", hair: "Ruivo", auto: "Moto Esportiva", feature: "Anel de Diamante", image: "/assets/images/villains/lady.png",
    lore: "Mercenária internacional procurada por furto qualificado e evasões espetaculares de prisões de segurança máxima. Move-se pelas sombras.",
    personality: "imprevisível",
    quirk: "Gira compulsivamente uma moeda antiga de ouro enquanto planeja seu próximo passo."
  },
  {
    name: "Dr. Dados", gender: "Masculino", hair: "Castanho", auto: "SUV Blindado", feature: "Óculos Escuros", image: "/assets/images/villains/dados.png",
    lore: "Gênio da cibersegurança que invadiu os servidores da ACME Detective Agency três vezes por pura diversão antes de se voltar para o roubo de relíquias reais.",
    personality: "nerd e obsessivo",
    quirk: "Se recusa a tocar nas coisas sem luvas, tem fobia crônica a ambientes sujos ou desorganizados."
  },
  {
    name: "Condessa Code", gender: "Feminino", hair: "Loiro", auto: "Jato Privado", feature: "Chapéu Elegante", image: "/assets/images/villains/condessa.png",
    lore: "Nascida na alta sociedade, usa suas conexões diplomáticas para contrabandear pelas fronteiras sem nunca ser revistada pela alfândega.",
    personality: "narcisista esnobe",
    quirk: "Tira fotos de si mesma nos monumentos enquanto a polícia ainda está investigando a cena do crime anterior."
  }
];

export const CITIES = {
  "Rio de Janeiro": {
    name: "Rio de Janeiro",
    country: "Brasil",
    desc: "A cidade maravilhosa, famosa pelo samba e praias.",
    places: ["Praia de Copacabana", "Cristo Redentor", "Sambódromo"],
    nextClues: {
      rookie: { geo: "Vi o suspeito comprando Reais (moeda do Brasil).", landmark: "Perguntou sobre o Cristo Redentor.", culture: "Estava ouvindo Samba e falando Português." },
      field: { geo: "Trocou dólares por uma moeda com o desenho de um beija-flor.", landmark: "Queria visitar o morro do Corcovado.", culture: "Perguntou onde comprar ingressos para os desfiles das escolas de samba." },
      elite: { geo: "A pessoa estava fascinada pelas notas coloridas com efígies de animais, como a garoupa.", landmark: "Disse que subiria a 710 metros de altitude para ver a Baía de Guanabara.", culture: "Murmurou algo sobre a maior festa popular do mundo originada pelos ritmos e tradições africanas..." }
    },
    coords: [-22.9068, -43.1729],
    color: "#f59e0b",
    image: "/assets/images/cities/rio.png",
    bgm: "bgm_rio",
    arrestBg: "/assets/images/arrests/rio.png"
  },
  "Paris": {
    name: "Paris",
    country: "França",
    desc: "A cidade luz, conhecida pela arte e gastronomia.",
    places: ["Torre Eiffel", "Museu do Louvre", "Arco do Triunfo"],
    nextClues: {
      rookie: { geo: "Trocou o dinheiro por Euros e disse 'Merci'.", landmark: "Queria ver a Torre Eiffel.", culture: "Comprou uma boina e um croissant." },
      field: { geo: "Estava com notas da zona do euro unificada e um dicionário de francês.", landmark: "Perguntou como chegar na famosa torre de treliça de ferro na avenida Gustave Eiffel.", culture: "Tomou um café fumando cigarro na calçada, elogiando a gastronomia clássica." },
      elite: { geo: "Foi a uma casa de câmbio pedir notas idênticas usadas pelo banco franco-germânico.", landmark: "Queria saber os horários do famoso monumento de aço inaugurado na Exposição Universal de 1889.", culture: "Estava devorando um volume de Victor Hugo após provar escargots em um bistrô sofisticado." }
    },
    coords: [48.8566, 2.3522],
    color: "#3b82f6",
    image: "/assets/images/cities/paris.png",
    bgm: "bgm_paris",
    arrestBg: "/assets/images/arrests/paris.png"
  },
  "Tóquio": {
    name: "Tóquio",
    country: "Japão",
    desc: "Uma metrópole vibrante e tecnológica.",
    places: ["Shibuya Crossing", "Templo Senso-ji", "Torre de Tóquio"],
    nextClues: {
      rookie: { geo: "Trocou o dinheiro por Ienes (moeda do Japão).", landmark: "Falou que ia pegar um trem-bala para o Monte Fuji.", culture: "Estava vestindo um kimono tradicional." },
      field: { geo: "Notei várias notas decoradas com o retrato do Hideyo Noguchi e flores de cerejeira.", landmark: "Perguntou sobre a vista de uma montanha vulcânica com pico nevado ao sul.", culture: "Fazia reverências para agradecer e usava pauzinhos para comer com extrema destreza." },
      elite: { geo: "As moedas dele tinham um orifício no centro. Estava muito confuso contando-as.", landmark: "Perguntou o trajeto exato até a montanha sagrada que inspirou Katsushika Hokusai.", culture: "Frenético discutindo detalhes de mechas enquanto tomava um chá matcha cerimonial." }
    },
    coords: [35.6762, 139.6503],
    color: "#8b5cf6",
    image: "/assets/images/cities/toquio.png",
    bgm: "bgm_toquio",
    arrestBg: "/assets/images/arrests/toquio.png"
  },
  "Cairo": {
    name: "Cairo",
    country: "Egito",
    desc: "Lar das antigas pirâmides e do Rio Nilo.",
    places: ["Pirâmides de Gizé", "Rio Nilo", "Museu Egípcio"],
    nextClues: {
      rookie: { geo: "Trocou o dinheiro por Libras Egípcias.", landmark: "Queria muito visitar as Pirâmides.", culture: "Ficou falando muito sobre faraós antigos e camelos." },
      field: { geo: "Vi ele separar cédulas com rostos de governantes antigos e esfinges.", landmark: "Buscou um guia para as estruturas monumentais de Quéops e Quéfren.", culture: "Comentou sobre navegar em felucas tradicionais e os deuses com cabeças de animais." },
      elite: { geo: "O sujeito manuseava piastras e libras norte-africanas com caracteres milenares em árabe.", landmark: "Queria a localização exata das únicas Maravilhas do Mundo Antigo que restaram na necrópole de Gizé.", culture: "Estava obcecado com papiros criptografados sobre a deusa Bastet e divindades celestiais." }
    },
    coords: [30.0444, 31.2357],
    color: "#eab308",
    image: "/assets/images/cities/cairo.png",
    bgm: "bgm_cairo",
    arrestBg: "/assets/images/arrests/cairo.png"
  },
  "Nova York": {
    name: "Nova York",
    country: "EUA",
    desc: "A cidade que nunca dorme.",
    places: ["Estátua da Liberdade", "Times Square", "Central Park"],
    nextClues: {
      rookie: { geo: "Trocou o dinheiro por Dólares Americanos.", landmark: "Queria ver a Estátua da Liberdade.", culture: "Pediu um Hot Dog com mostarda na barraquinha amarela." },
      field: { geo: "Pagou as coisas com notas verdes adornadas pelo rosto de George Washington.", landmark: "Perguntou as coordenadas do monumento doado pela França no século XIX.", culture: "Correu para o metrô rápido mastigando um pretzel quente pelas avenidas gigantes." },
      elite: { geo: "Reclamava das 'greenbacks' (notas fiduciárias) e da falta da marca d'água robusta dos Euros.", landmark: "Buscou a balsa para a ilha que abriga um farol neoclássico de 93 metros feito de cobre.", culture: "Reclamava ruidosamente do clima hostil de Wall Street enquanto engolia um bagel." }
    },
    coords: [40.7128, -74.0060],
    color: "#10b981",
    image: "/assets/images/cities/novayork.png",
    bgm: "bgm_novayork",
    arrestBg: "/assets/images/arrests/novayork.png"
  },
  "Londres": {
    name: "Londres",
    country: "Reino Unido",
    desc: "Terra da Rainha e dos ônibus vermelhos.",
    places: ["Big Ben", "London Eye", "Palácio de Buckingham"],
    nextClues: {
      rookie: { geo: "Trocou dinheiro por Libras Esterlinas.", landmark: "Perguntou as horas do relógio Big Ben.", culture: "Tomou chá das cinco e andou em um ônibus vermelho de 2 andares." },
      field: { geo: "Exibia com orgulho as notas com a cara do atual monarca da realeza britânica.", landmark: "Estava perdido atrás de uma torre de relógio pontiaguda às margens do Tâmisa.", culture: "Reclamava da chuva persistente fina, enquanto bebia um Earl Grey com leite." },
      elite: { geo: "Ele ficou frustrado porque sua moeda europeia não foi aceita e precisou pegar Pound Sterling de emergência.", landmark: "Estudava intensamente uma planta detalhada da Torre de Elizabeth no Palácio de Westminster.", culture: "Foi detido levemente por gritar teorias absurdas sobre os guardas da coroa estáticos de chapéu felpudo." }
    },
    coords: [51.5074, -0.1278],
    color: "#64748b",
    image: "/assets/images/cities/londres.png",
    bgm: "bgm_londres",
    arrestBg: "/assets/images/arrests/londres.png"
  }
};

export const LOOT = [
  { name: "o Diamante Hope", image: "/assets/images/loots/loot_diamante_hope_1771546674975.png" },
  { name: "o Código Fonte da Internet", image: "/assets/images/loots/loot_codigo_fonte_1771546690029.png" },
  { name: "a Coroa Real", image: "/assets/images/loots/loot_coroa_real_1771546713166.png" },
  { name: "o Mapa do Tesouro", image: "/assets/images/loots/loot_mapa_tesouro_1771546731435.png" },
  { name: "a Mona Lisa", image: "/assets/images/loots/loot_mona_lisa_1771546746436.png" }
];
