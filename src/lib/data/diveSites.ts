export interface DiveSite {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  imageUrl: string
  videoUrl: string
  depth: string
  current: string
  visibility: string
  bestSeason: string[]
  seaLife: Record<string, string[]>
}

export const diveSites: DiveSite[] = [
  {
    slug: 'shark-bay',
    name: 'Shark Bay',
    shortDescription:
      'A popular dive site with mild currents and abundant marine life.',
    longDescription: `Shark Bay in Koh Tao offers calm to moderate currents and excellent visibility during the dry season. 
    Divers can explore vibrant coral reefs, swim-throughs, and spot reef sharks along with a diverse range of tropical fish. 
    Ideal for beginner to intermediate divers, it’s a must-visit site throughout the best diving months from March to September.`,
    imageUrl: '/images/shark-bay.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DI5bXLjZkzU',
    depth: '5m - 25m',
    current: 'Mild in dry season, stronger during monsoon',
    visibility: '5m to 20m(seasonal)',
    bestSeason: ['Dry Season (Mar-Sep)'],
    seaLife: {
      Spring: ['Blacktip Reef Sharks', 'Parrotfish'],
      Summer: ['Turtles', 'Reef Sharks'],
      Fall: ['Barracuda', 'Snapper'],
      Winter: ['Triggerfish', 'Surgeonfish'],
    },
  },
  {
    slug: 'cpn',
    name: 'Chumphon Pinnacle',
    shortDescription: `Iconic deep dive site with granite pinnacles and pelagic life.`,
    longDescription: `Chumphon Pinnacle is a world-class dive site northwest of Koh Tao, 
    featuring dramatic submerged granite formations that descend beyond 36 meters. 
    The area is covered in sea anemones, soft corals, and is home to schools of trevally, batfish, and barracuda. 
    Whale sharks are often seen between March and June. Due to its depth and strong currents, it is ideal for advanced divers.`,
    imageUrl: '/images/cpn.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DI5bXLjZkzU',
    depth: '14–36+ meters',
    current: 'Moderate to strong',
    visibility: '10–30 meters',
    bestSeason: ['March', 'April', 'May', 'June'],
    seaLife: {
      Spring: ['Whale Shark', 'Trevally', 'Batfish'],
      Summer: ['Barracuda', 'Scorpionfish'],
      Fall: ['Tuna', 'Grouper'],
      Winter: ['Batfish', 'Fusiliers'],
    },
  },
  {
    slug: 'southwest-pinnacle',
    name: 'Southwest Pinnacle',
    shortDescription: 'Deep pinnacle dive with rich marine life and pelagics.',
    longDescription:
      'Southwest Pinnacle is a world-class dive site featuring towering underwater pinnacles rising from the seafloor. Expect massive schools of snapper, trevally, and barracuda, as well as occasional visits from whale sharks. Due to its depth and exposure, it’s best suited for advanced divers.',
    imageUrl: '/images/southwest.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=0O19Yz_G5To',
    depth: '8–30m',
    current: 'Mild to Strong',
    visibility: '10–25m',
    bestSeason: ['April', 'May', 'June', 'July', 'August', 'September'],
    seaLife: {
      Spring: ['Trevally', 'Batfish', 'Barracuda'],
      Summer: ['Whale Sharks', 'Snapper', 'Fusiliers'],
      Fall: ['Groupers', 'Moray Eels'],
      Winter: ['Triggerfish', 'Lionfish'],
    },
  },
  {
    slug: 'white-rock',
    name: 'White Rock',
    shortDescription:
      'A popular, all-level site with coral gardens and turtles.',
    longDescription:
      'White Rock is one of Koh Tao’s most frequented dive sites, known for its large coral heads, sandy patches, and easy navigation. It’s ideal for beginners but rich enough for experienced divers to enjoy night dives, blue-spotted stingrays, and occasional hawksbill turtles.',
    imageUrl: '/images/white-rock.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Wc-90jV6wPI',
    depth: '6–22m',
    current: 'Mild',
    visibility: '10–20m',
    bestSeason: ['March', 'April', 'May', 'August', 'September'],
    seaLife: {
      Spring: ['Turtles', 'Parrotfish'],
      Summer: ['Stingrays', 'Sweetlips'],
      Fall: ['Moray Eels', 'Scorpionfish'],
      Winter: ['Shrimpfish', 'Butterflyfish'],
    },
  },
  {
    slug: 'twins',
    name: 'Twins',
    shortDescription: 'Beginner-friendly site with a famous clownfish colony.',
    longDescription:
      'Twins is a calm and shallow dive site perfect for Open Water training. Located next to Koh Nang Yuan, it features two main coral pinnacles with sandy patches in between. Divers can spot Nemo (clownfish), nudibranchs, and often juvenile reef fish. Great visibility and light currents year-round.',
    imageUrl: '/images/twins.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=TGgy3u8EqKw',
    depth: '5–18m',
    current: 'Low',
    visibility: '15–25m',
    bestSeason: ['All year'],
    seaLife: {
      Spring: ['Clownfish', 'Wrasse'],
      Summer: ['Nudibranchs', 'Damselfish'],
      Fall: ['Angelfish', 'Gobies'],
      Winter: ['Boxfish', 'Trumpetfish'],
    },
  },
  {
    slug: 'hin-wong-bay',
    name: 'Hin Wong Bay',
    shortDescription: 'A scenic bay with boulder formations and shallow reefs.',
    longDescription:
      'Hin Wong Bay is a relaxed dive and snorkel site on the east coast of Koh Tao. Known for its granite boulders, soft corals, and large schools of fusiliers, it’s an excellent choice for macro photography and beginner divers. Calm conditions and good visibility make it a year-round favorite.',
    imageUrl: '/images/hin-wong.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=MAIPjYyz4m8',
    depth: '5–18m',
    current: 'Low',
    visibility: '10–20m',
    bestSeason: ['All year'],
    seaLife: {
      Spring: ['Fusiliers', 'Butterflyfish'],
      Summer: ['Boxfish', 'Parrotfish'],
      Fall: ['Shrimp', 'Moray Eels'],
      Winter: ['Pipefish', 'Damsels'],
    },
  },
  {
    slug: 'aow-leuk',
    name: 'Aow Leuk',
    shortDescription: 'Sheltered bay with coral gardens and shallow depth.',
    longDescription:
      'Aow Leuk is one of Koh Tao’s best sites for beginner divers and snorkelers. Its calm bay is home to vibrant coral gardens and a variety of reef fish including butterflyfish, groupers, and sometimes blacktip reef sharks. Great for long, easy dives with excellent sunlight penetration.',
    imageUrl: '/images/aow-leuk.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=O64fxAvnHTE',
    depth: '3–14m',
    current: 'Very Low',
    visibility: '10–25m',
    bestSeason: ['All year'],
    seaLife: {
      Spring: ['Butterflyfish', 'Wrasse'],
      Summer: ['Juvenile Groupers', 'Blacktip Sharks'],
      Fall: ['Snappers', 'Clams'],
      Winter: ['Parrotfish', 'Sea Urchins'],
    },
  },
  {
    slug: 'green-rock',
    name: 'Green Rock',
    shortDescription: 'Dramatic swim-throughs and boulders near Nang Yuan.',
    longDescription:
      'Green Rock is located just off Koh Nang Yuan and is known for its large rock formations, swim-throughs, and deep crevices. More suited for intermediate to advanced divers, the site attracts triggerfish, morays, and occasional titan triggerfish during nesting season. It’s adventurous and rich in life.',
    imageUrl: '/images/green-rock.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=FnGAdpsuogA',
    depth: '5–28m',
    current: 'Mild to Strong',
    visibility: '10–20m',
    bestSeason: ['April', 'May', 'June', 'July', 'August'],
    seaLife: {
      Spring: ['Moray Eels', 'Snapper'],
      Summer: ['Triggerfish', 'Scorpionfish'],
      Fall: ['Parrotfish', 'Blue-Spotted Rays'],
      Winter: ['Filefish', 'Crabs'],
    },
  },

  // add more dive sites here if needed
]

export const diveSitesRU: DiveSite[] = [
  {
    slug: 'shark-bay',
    name: 'Shark Bay',
    shortDescription:
      'Популярное место для дайвинга с мягкими течениями и богатой морской жизнью.',
    longDescription: `Shark Bay на Ко Тао предлагает спокойные или умеренные течения и отличную видимость в сухой сезон. 
Дайверы могут исследовать красочные коралловые рифы, тоннели и увидеть рифовых акул, а также разнообразие тропических рыб. 
Идеально подходит для начинающих и опытных дайверов, обязательное место для посещения с марта по сентябрь.`,
    imageUrl: '/images/shark-bay.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DI5bXLjZkzU',
    depth: '5–25 м',
    current: 'Слабое в сухой сезон, сильнее во время муссона',
    visibility: '5–20 м (в зависимости от сезона)',
    bestSeason: ['Сухой сезон (март–сентябрь)'],
    seaLife: {
      Spring: ['Рифовые акулы', 'Попугаеобразные'],
      Summer: ['Черепахи', 'Рифовые акулы'],
      Fall: ['Барракуды', 'Кефали'],
      Winter: ['Кефаль', 'Хирургические рыбы'],
    },
  },
  {
    slug: 'cpn',
    name: 'Chumphon Pinnacle',
    shortDescription:
      'Знаковое глубоководное место с гранитными пиками и пелагической жизнью.',
    longDescription: `Chumphon Pinnacle — мирового класса место для дайвинга к северо-западу от Ко Тао, 
с эффектными подводными гранитными образованиями, уходящими глубже 36 метров. 
Район покрыт морскими анемонами, мягкими кораллами и является домом для стай тунецов, летучих рыб и барракуд. 
Китовые акулы часто встречаются с марта по июнь. Благодаря глубине и сильным течениям идеально подходит для опытных дайверов.`,
    imageUrl: '/images/cpn.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DI5bXLjZkzU',
    depth: '14–36+ м',
    current: 'Умеренное до сильного',
    visibility: '10–30 м',
    bestSeason: ['Март', 'Апрель', 'Май', 'Июнь'],
    seaLife: {
      Spring: ['Китовая акула', 'Тунец', 'Летучие рыбы'],
      Summer: ['Барракуды', 'Скорпены'],
      Fall: ['Тунец', 'Груперы'],
      Winter: ['Летучие рыбы', 'Фузилеры'],
    },
  },
  {
    slug: 'southwest-pinnacle',
    name: 'Southwest Pinnacle',
    shortDescription:
      'Глубоководное погружение с богатыми морскими обитателями и пелагической жизнью.',
    longDescription: `Southwest Pinnacle — это мирового класса место для дайвинга с возвышающимися подводными пиками, поднимающимися со дна. 
Ожидайте огромные стаи луцианов, тунецов и барракуд, а также случайные появления китовых акул. 
Благодаря глубине и открытости идеально подходит для опытных дайверов.`,
    imageUrl: '/images/southwest.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=0O19Yz_G5To',
    depth: '8–30 м',
    current: 'Слабое до сильного',
    visibility: '10–25 м',
    bestSeason: ['Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
    seaLife: {
      Spring: ['Луцианы', 'Летучие рыбы', 'Барракуды'],
      Summer: ['Китовые акулы', 'Кефали', 'Фузилеры'],
      Fall: ['Груперы', 'Мурены'],
      Winter: ['Кефаль', 'Львиные рыбы'],
    },
  },
  {
    slug: 'white-rock',
    name: 'White Rock',
    shortDescription:
      'Популярное место для дайвинга для всех уровней с коралловыми садами и черепахами.',
    longDescription: `White Rock — одно из самых посещаемых мест для дайвинга на Ко Тао, 
известное своими большими коралловыми головами, песчаными участками и легкой навигацией. 
Идеально для начинающих, но достаточно интересно для опытных дайверов: ночные погружения, скаты с синими пятнами и иногда черепахи-хоуксли.`,
    imageUrl: '/images/white-rock.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=Wc-90jV6wPI',
    depth: '6–22 м',
    current: 'Слабое',
    visibility: '10–20 м',
    bestSeason: ['Март', 'Апрель', 'Май', 'Август', 'Сентябрь'],
    seaLife: {
      Spring: ['Черепахи', 'Попугаеобразные'],
      Summer: ['Скаты', 'Лабриды'],
      Fall: ['Мурены', 'Скорпены'],
      Winter: ['Креветочные рыбы', 'Бабочки'],
    },
  },
  {
    slug: 'twins',
    name: 'Twins',
    shortDescription: 'Место для начинающих с известной колонией клоунов.',
    longDescription: `Twins — спокойное и мелководное место для дайвинга, идеально подходящее для обучения Open Water. 
Расположено рядом с Ко Нанг Юан, включает два основных коралловых пика с песчаными участками между ними. 
Дайверы могут увидеть Немо (клоунов), морских слизней и часто ювенильных рифовых рыб. Отличная видимость и слабые течения круглый год.`,
    imageUrl: '/images/twins.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=TGgy3u8EqKw',
    depth: '5–18 м',
    current: 'Слабое',
    visibility: '15–25 м',
    bestSeason: ['Круглый год'],
    seaLife: {
      Spring: ['Клоуны', 'Лабриды'],
      Summer: ['Морские слизни', 'Семейство губановых'],
      Fall: ['Скаты', 'Гобии'],
      Winter: ['Кубические рыбы', 'Трубкозубые'],
    },
  },
  {
    slug: 'hin-wong-bay',
    name: 'Hin Wong Bay',
    shortDescription:
      'Живописный залив с валунными образованиями и мелкими рифами.',
    longDescription: `Hin Wong Bay — спокойное место для дайвинга и сноркелинга на восточном побережье Ко Тао. 
Известно гранитными валунами, мягкими кораллами и большими стаями фузилеров, отлично подходит для макрофотографии и начинающих дайверов. 
Спокойные условия и хорошая видимость делают его любимым круглый год.`,
    imageUrl: '/images/hin-wong.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=MAIPjYyz4m8',
    depth: '5–18 м',
    current: 'Слабое',
    visibility: '10–20 м',
    bestSeason: ['Круглый год'],
    seaLife: {
      Spring: ['Фузилеры', 'Бабочки'],
      Summer: ['Кубические рыбы', 'Попугаеобразные'],
      Fall: ['Креветки', 'Мурены'],
      Winter: ['Трубкозубые', 'Цифоидные рыбы'],
    },
  },
  {
    slug: 'aow-leuk',
    name: 'Aow Leuk',
    shortDescription: 'Уютный залив с коралловыми садами и мелкой глубиной.',
    longDescription: `Aow Leuk — одно из лучших мест для начинающих дайверов и снорклеров. 
Спокойный залив с красочными коралловыми садами и разнообразием рифовых рыб, включая бабочек, груперов и иногда рифовых акул. 
Отлично для длительных, легких погружений с отличной видимостью и солнечным светом.`,
    imageUrl: '/images/aow-leuk.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=O64fxAvnHTE',
    depth: '3–14 м',
    current: 'Очень слабое',
    visibility: '10–25 м',
    bestSeason: ['Круглый год'],
    seaLife: {
      Spring: ['Бабочки', 'Лабриды'],
      Summer: ['Молодые груперы', 'Рифовые акулы'],
      Fall: ['Снапы', 'Моллюски'],
      Winter: ['Попугаеобразные', 'Морские ежи'],
    },
  },
  {
    slug: 'green-rock',
    name: 'Green Rock',
    shortDescription: 'Драматические проходы и валуны рядом с Нанг Юан.',
    longDescription: `Green Rock расположен недалеко от Ко Нанг Юан и известен своими крупными каменными образованиями, проходами и глубокими трещинами. 
Более подходит для средних и опытных дайверов. Здесь встречаются игловидные рыбы, мурены и иногда титановый триггер во время сезона гнездования. 
Это захватывающее место с богатой морской жизнью.`,
    imageUrl: '/images/green-rock.jpeg',
    videoUrl: 'https://www.youtube.com/watch?v=FnGAdpsuogA',
    depth: '5–28 м',
    current: 'Слабое до сильного',
    visibility: '10–20 м',
    bestSeason: ['Апрель', 'Май', 'Июль', 'Август'],
    seaLife: {
      Spring: ['Мурены', 'Кефали'],
      Summer: ['Игловидные рыбы', 'Скорпены'],
      Fall: ['Попугаеобразные', 'Синие скаты'],
      Winter: ['Филе-рыбы', 'Крабы'],
    },
  },
]
