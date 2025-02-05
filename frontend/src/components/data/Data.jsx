// Navigation links
export const nav = [
<<<<<<< HEAD
    {
      text: "Accueil",
      path: "/",
    },
    {
      text: "A propos",
      path: "/about",
    },
    {
      text: "Catégories",
      path: "/services",
    },
    {
      text: "Blog",
      path: "/blog",
    },
    // {
    //   text: "Login",
    //   path: "/login",
    // },
    // {
    //   text: "Signup",
    //   path: "/signup",
    // },
    // {
    //   text: "Pricing",
    //   path: "/pricing",
    // },
    {
      text: "Contact",
      path: "/contact",
    },
  ]
  export const featured = [
    // {
    //   cover: "../images/hero/h1.png",
    //   name: "Family House",
    //   total: "122 Property",
    // },
    {
      cover: "../images/hero/h2.png",
      name: "Maison & Villa",
      total: "155 Property",
    },
    {
      cover: "../images/hero/h3.png",
      name: "Apartements",
      total: "300 Property",
    },
    // {
    //   cover: "../images/hero/h4.png",
    //   name: "Office & Studio",
    //   total: "80 Property",
    // },
    {
      cover: "../images/hero/boutique.png",
      name: "Boutiques",
      total: "80 Property",
    },
  ]
  export const list = [
    // Dernières maisons
    {
      id: 1,
      cover: "../images/properties/house2.jpg",
      name: "Maison familiale à Ksar",
      description: "Belle maison traditionnelle avec grand jardin",
      location: "Ksar, Nouakchott",
      category: "À louer",
      price: "120,000",
      type: "Maison",
      surface: "300 m²",
      bedrooms: 4,
      bathrooms: 2,
      features: [
        "Jardin spacieux",
        "Garage pour 2 voitures",
        "Cuisine équipée",
        "Climatisation",
        "Système de sécurité"
      ]
    },
    {
      id: 2,
      cover: "../images/properties/house3.jpg",
      name: "Villa luxueuse à Dar Naim",
      description: "Villa moderne avec finitions haut de gamme et piscine",
      location: "Dar Naim, Nouakchott",
      category: "À louer",
      price: "100,000",
      type: "Villa",
      surface: "400 m²",
      bedrooms: 5,
      bathrooms: 3,
      features: [
        "Piscine privée",
        "Jardin aménagé",
        "Double garage",
        "Cuisine moderne",
        "Système de sécurité 24/7"
      ]
    },

    // Derniers appartements
    {
      id: 3,
      cover: "../images/properties/aparment2.jpg",
      name: "Studio meublé à Tevragh Zeina",
      description: "Studio moderne entièrement meublé dans une résidence sécurisée",
      location: "Tevragh Zeina, Nouakchott",
      category: "À louer",
      price: "400,000",
      type: "Appartement",
      surface: "45 m²",
      bedrooms: 1,
      bathrooms: 1,
      features: [
        "Meublé et équipé",
        "Climatisation",
        "Parking sécurisé",
        "Ascenseur",
        "Gardiennage 24/7"
      ]
    },
    {
      id: 4,
      cover: "../images/properties/aparment3.jpg",
      name: "Duplex avec terrasse",
      description: "Magnifique duplex avec grande terrasse et vue dégagée",
      location: "Las Palmas, Nouakchott",
      category: "À louer",
      price: "300,000",
      type: "Appartement",
      surface: "180 m²",
      bedrooms: 4,
      bathrooms: 2,
      features: [
        "Grande terrasse",
        "Vue panoramique",
        "Cuisine équipée",
        "Climatisation centralisée",
        "Place de parking"
      ]
    },

    // Dernières boutiques
    {
      id: 5,
      cover: "../images/properties/shop1.jpg",
      name: "Local commercial au Marché Capital",
      description: "Boutique bien située avec forte affluence",
      location: "Marché Capital, Nouakchott",
      category: "À louer",
      price: "80,000",
      type: "Boutique",
      surface: "80 m²",
      features: [
        "Forte affluence",
        "Emplacement stratégique",
        "Vitrine de 10m",
        "Accès facile",
        "Zone commerciale active"
      ]
    },
    {
      id: 6,
      cover: "../images/properties/shop3.jpg",
      name: "Local commercial à El Mina",
      description: "Grande boutique avec entrepôt, idéale pour commerce",
      location: "El Mina, Nouakchott",
      category: "À louer",
      price: "40,000",
      type: "Boutique",
      surface: "150 m²",
      features: [
        "Espace stockage",
        "Double entrée",
        "Système de sécurité",
        "Parking client",
        "Zone de déchargement"
      ]
    },
  ];
  
  export const awards = [
    {
      icon: <i class='fa-solid fa-trophy'></i>,
      num: "32 M	",
      name: "Blue Burmin Award",
    },
    {
      icon: <i class='fa-solid fa-briefcase'></i>,
      num: "43 M",
      name: "Mimo X11 Award",
    },
    {
      icon: <i class='fa-solid fa-lightbulb'></i>,
      num: "51 M",
      name: "Australian UGC Award",
    },
    {
      icon: <i class='fa-solid fa-heart'></i>,
      num: "42 M",
      name: "IITCA Green Award",
    },
  ]
  export const location = [
    {
      id: 1,
      name: "TVZ, Nouakchott",
      Villas: "3 Maisons",
      Apartments: "2 Apartements",
      Boutiques: "07 boutiques",
      cover: "./images/location/tevragh.jpg",
    },
    {
      id: 2,
      name: "Riyadh, Nouakchott",
      Villas: "12 Villas",
      Apartments: "10 Apartments",
      Boutiques: "07 Offices",
      cover: "./images/location/Riyadh.jpg",
    },
    {
      id: 3,
      name: "Lksar, Nouakchott",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Boutiques: "07 Offices",
      cover: "./images/location/Lksar.jpg",
    },
    {
      id: 4,
      name: "Dubai, Nouadhibou",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Boutiques: "07 Offices",
      cover: "./images/location/ndb.jpg",
    },
    {
      id: 5,
      name: "Capitale, Nouakchott",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Boutiques: "07 Offices",
      cover: "./images/location/plus.jpg",
    },
    {
      id: 6,
      name: "Sebkha, Nouakchott",
      Villas: "12 Villas",
      Apartments: " 10 Apartments",
      Boutiques: "07 Offices",
      cover: "./images/location/sebkha.jpg",
    },
  ]
  export const team = [
    {
      list: "50",
      cover: "../images/customer/team-1.jpg",
      address: "Liverpool, Canada",
      name: "Sargam S. Singh",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "70",
      cover: "../images/customer/team-2.jpg",
      address: "Montreal, Canada",
      name: "Harijeet M. Siller",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "80",
      cover: "../images/customer/team-3.jpg",
      address: "Denever, USA",
      name: "Anna K. Young",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "51",
      cover: "../images/customer/team-4.jpg",
      address: "2272 Briarwood Drive",
      name: "Michael P. Grimaldo",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "42",
      cover: "../images/customer/team-5.jpg",
      address: "2272 Briarwood Drive",
      name: "Michael P. Grimaldo",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
    {
      list: "38",
      cover: "../images/customer/team-5.jpg",
      address: "Montreal, USA",
      name: "Adam K. Jollio",
      icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
    },
  ]
  export const price = [
    {
      plan: "Basic",
      price: "29",
      ptext: "per user, per month",
      list: [
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "99.5% Uptime Guarantee",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "120GB CDN Bandwidth",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "5GB Cloud Storage",
        },
        { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "Personal Help Support" },
        { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "Enterprise SLA" },
      ],
    },
    {
      best: "Best Value",
      plan: "Standard",
      price: "49",
      ptext: "per user, per month",
      list: [
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "99.5% Uptime Guarantee",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "150GB CDN Bandwidth",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "10GB Cloud Storage",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "Personal Help Support",
        },
        {
          change: "color",
          icon: <i class='fa-solid fa-x'></i>,
          text: "Enterprise SLA",
        },
      ],
    },
    {
      plan: "Platinum",
      price: "79",
      ptext: "2 user, per month",
      list: [
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "100% Uptime Guarantee",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "200GB CDN Bandwidth",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "20GB Cloud Storage",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "Personal Help Support",
        },
        {
          icon: <i class='fa-solid fa-check'></i>,
          text: "Enterprise SLA",
        },
      ],
    },
  ]
  export const footer = [
    {
      title: "LAYOUTS",
      text: [{ list: "Home Page" }, { list: "About Page" }, { list: "Service Page" }, { list: "Property Page" }, { list: "Contact Page" }, { list: "Single Blog" }],
    },
    {
      title: "ALL SECTIONS",
      text: [{ list: "Headers" }, { list: "Features" }, { list: "Attractive" }, { list: "Testimonials" }, { list: "Videos" }, { list: "Footers" }],
    },
    {
      title: "COMPANY",
      text: [{ list: "About" }, { list: "Blog" }, { list: "Pricing" }, { list: "Affiliate" }, { list: "Login" }, { list: "Changelog" }],
    },
  ]
  
  // Nouvelles données pour les maisons
  export const housesData = [
    {
      id: 1,
      title: "Villa moderne à Tevragh Zeina",
      description: "Magnifique villa de 5 chambres avec piscine",
      price: "150,000",
      image: "../images/properties/house1.jpeg",
      location: "Tevragh Zeina, Nouakchott",
      bedrooms: 5,
      bathrooms: 3,
      surface: "400 m²",
    },
    {
      id: 2,
      title: "Maison familiale à Ksar",
      description: "Belle maison traditionnelle avec grand jardin",
      price: "120,000",
      image: "../images/properties/house2.jpg",
      location: "Ksar, Nouakchott",
      bedrooms: 4,
      bathrooms: 2,
      surface: "300 m²",
    },
    {
      id: 3,
      title: "Villa luxueuse à Dar Naim",
      description: "Villa moderne avec finitions haut de gamme",
      price: "100,000",
      image: "../images/properties/house3.jpg",
      location: "Dar Naim, Nouakchott",
      bedrooms: 6,
      bathrooms: 4,
      surface: "500 m²",
    }
  ];
  
  // Nouvelles données pour les appartements
  export const apartmentsData = [
    {
      id: 1,
      title: "Appartement moderne au ksar",
      description: "Bel appartement rénové avec vue sur la ville",
      price: "100,000",
      image: "../images/properties/aparment1.jpg",
      location: "Centre-ville, Nouakchott",
      bedrooms: 3,
      bathrooms: 2,
      surface: "120 m²",
    },
    {
      id: 2,
      title: "Studio meublé à Tevragh Zeina",
      description: "Studio tout confort dans résidence sécurisée",
      price: "400,000",
      image: "../images/properties/aparment2.jpg",
      location: "Tevragh Zeina, Nouakchott",
      bedrooms: 1,
      bathrooms: 1,
      surface: "45 m²",

    },
    {
      id: 3,
      title: "Duplex avec terrasse",
      description: "Magnifique duplex avec grande terrasse",
      price: "300,000",
      image: "../images/properties/aparment3.jpg",
      location: "Las Palmas, Nouakchott",
      bedrooms: 4,
      bathrooms: 2,
      surface: "180 m²",

    }
  ];
  
  // Nouvelles données pour les boutiques
  export const shopsData = [
    {
      id: 1,
      title: "Local commercial au Marché Capital",
      description: "Boutique bien située avec forte affluence",
      price: "80,000",
      image: "../images/properties/shop1.jpg",
      location: "Marché Capital, Nouakchott",
      surface: "80 m²",
      vitrine: "10 m",
    },
    {
      id: 2,
      title: "Nouveau Boutique à Riyadh",
      description: "Local commercial neuf, emplacement premium",
      price: "25,000",
      image: "../images/properties/shop2.jpg",
      location: "Tevragh Zeina, Nouakchott",
      surface: "100 m²",
      vitrine: "15 m",
    },
    {
      id: 3,
      title: "Local commercial à El Mina",
      description: "Grande boutique avec entrepôt",
      price: "40,000",
      image: "../images/properties/shop3.jpg",
      location: "El Mina, Nouakchott",
      surface: "150 m²",
      vitrine: "12 m",
    }
  ];
  
=======
  { text: "Accueil", path: "/" },
  { text: "A propos", path: "/about" },
  { text: "Catégories", path: "/services" },
  { text: "Blog", path: "/blog" },
  { text: "Contact", path: "/contact" },
];

// Featured categories
export const featured = [
  { cover: "../images/hero/h2.png", name: "Maison & Villa", total: "155 Property" },
  { cover: "../images/hero/h3.png", name: "Appartement", total: "300 Property" },
  { cover: "../images/hero/boutique.png", name: "Boutiques", total: "80 Property" },
];

// Property list
export const list = [
  {
    id: 1,
    cover: "../images/list/p-1.png",
    name: "Agence Immobilière Nouakchott",
    location: "Tevragh Zeina, Nouakchott",
    category: "À louer",
    price: "20,000",
    type: "Appartement",
  },
  {
    id: 2,
    cover: "../images/list/p-2.png",
    name: "Propriétés El Mina - Villa",
    location: "Route de l'Espoir, El Mina, Nouakchott",
    category: "À vendre",
    price: "5,000,000",
    type: "Villa",
  },
  {
    id: 3,
    cover: "../images/list/p-7.png",
    name: "Espaces Nouadhibou - Maison",
    location: "Avenue de la Liberté, Nouadhibou",
    category: "À louer",
    price: "30,000",
    type: "Maison",
  },
  {
    id: 4,
    cover: "../images/list/p-4.png",
    name: "Résidence Ksar - Maison",
    location: "Quartier Ksar, Nouakchott",
    category: "À vendre",
    price: "2,000,000",
    type: "Maison",
  },
  {
    id: 5,
    cover: "../images/list/p-5.png",
    name: "Immeubles Sebkha",
    location: "Sebkha, Nouakchott",
    category: "À louer",
    price: "50,00000",
    type: "Boutiques",
  },
  {
    id: 6,
    cover: "../images/list/p-6.png",
    name: "Agence Teyarett - Appartement",
    location: "Teyarett, Nouakchott",
    category: "À vendre",
    price: "500,000",
    type: "Appartement",
  },
];

// Awards data
export const awards = [
  { icon: <i class="fa-solid fa-trophy"></i>, num: "32 M", name: "Blue Burmin Award" },
  { icon: <i class="fa-solid fa-briefcase"></i>, num: "43 M", name: "Mimo X11 Award" },
  { icon: <i class="fa-solid fa-lightbulb"></i>, num: "51 M", name: "Australian UGC Award" },
  { icon: <i class="fa-solid fa-heart"></i>, num: "42 M", name: "IITCA Green Award" },
];

// Locations data
export const location = [
  {
    id: 1,
    name: "TVZ, Nouakchott",
    Villas: "3 Maisons",
    Apartments: "2 Apartements",
    Boutiques: "07 boutiques",
    cover: "./images/location/tevragh.jpg",
  },
  {
    id: 2,
    name: "Riyadh, Nouakchott",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Boutiques: "07 Offices",
    cover: "./images/location/Riyadh.jpg",
  },
  {
    id: 3,
    name: "Lksar, Nouakchott",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Boutiques: "07 Offices",
    cover: "./images/location/Lksar.jpg",
  },
  {
    id: 4,
    name: "Dubai, Nouadhibou",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Boutiques: "07 Offices",
    cover: "./images/location/ndb.jpg",
  },
  {
    id: 5,
    name: "Capitale, Nouakchott",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Boutiques: "07 Offices",
    cover: "./images/location/plus.jpg",
  },
  {
    id: 6,
    name: "Sebkha, Nouakchott",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Boutiques: "07 Offices",
    cover: "./images/location/sebkha.jpg",
  },
];

// Team members
export const team = [
  {
    list: "50",
    cover: "../images/customer/team-1.jpg",
    address: "Liverpool, Canada",
    name: "Sargam S. Singh",
    icon: [
      <i class="fa-brands fa-facebook-f"></i>,
      <i class="fa-brands fa-linkedin"></i>,
      <i class="fa-brands fa-twitter"></i>,
      <i class="fa-brands fa-instagram"></i>,
    ],
  },
  {
    list: "70",
    cover: "../images/customer/team-2.jpg",
    address: "Montreal, Canada",
    name: "Harijeet M. Siller",
    icon: [
      <i class="fa-brands fa-facebook-f"></i>,
      <i class="fa-brands fa-linkedin"></i>,
      <i class="fa-brands fa-twitter"></i>,
      <i class="fa-brands fa-instagram"></i>,
    ],
  },
  {
    list: "80",
    cover: "../images/customer/team-3.jpg",
    address: "Denever, USA",
    name: "Anna K. Young",
    icon: [
      <i class="fa-brands fa-facebook-f"></i>,
      <i class="fa-brands fa-linkedin"></i>,
      <i class="fa-brands fa-twitter"></i>,
      <i class="fa-brands fa-instagram"></i>,
    ],
  },
  {
    list: "51",
    cover: "../images/customer/team-4.jpg",
    address: "2272 Briarwood Drive",
    name: "Michael P. Grimaldo",
    icon: [
      <i class="fa-brands fa-facebook-f"></i>,
      <i class="fa-brands fa-linkedin"></i>,
      <i class="fa-brands fa-twitter"></i>,
      <i class="fa-brands fa-instagram"></i>,
    ],
  },
];

// Pricing plans
export const price = [
  {
    plan: "Basic",
    price: "29",
    ptext: "per user, per month",
    list: [
      { icon: <i class="fa-solid fa-check"></i>, text: "99.5% Uptime Guarantee" },
      { icon: <i class="fa-solid fa-check"></i>, text: "120GB CDN Bandwidth" },
      { icon: <i class="fa-solid fa-check"></i>, text: "5GB Cloud Storage" },
      { change: "color", icon: <i class="fa-solid fa-x"></i>, text: "Personal Help Support" },
      { change: "color", icon: <i class="fa-solid fa-x"></i>, text: "Enterprise SLA" },
    ],
  },
  {
    best: "Best Value",
    plan: "Standard",
    price: "49",
    ptext: "per user, per month",
    list: [
      { icon: <i class="fa-solid fa-check"></i>, text: "99.5% Uptime Guarantee" },
      { icon: <i class="fa-solid fa-check"></i>, text: "150GB CDN Bandwidth" },
      { icon: <i class="fa-solid fa-check"></i>, text: "10GB Cloud Storage" },
      { icon: <i class="fa-solid fa-check"></i>, text: "Personal Help Support" },
      { change: "color", icon: <i class="fa-solid fa-x"></i>, text: "Enterprise SLA" },
    ],
  },
  {
    plan: "Platinum",
    price: "79",
    ptext: "2 user, per month",
    list: [
      { icon: <i class="fa-solid fa-check"></i>, text: "100% Uptime Guarantee" },
      { icon: <i class="fa-solid fa-check"></i>, text: "200GB CDN Bandwidth" },
      { icon: <i class="fa-solid fa-check"></i>, text: "20GB Cloud Storage" },
      { icon: <i class="fa-solid fa-check"></i>, text: "Personal Help Support" },
      { icon: <i class="fa-solid fa-check"></i>, text: "Enterprise SLA" },
    ],
  },
];
>>>>>>> ae1d66cfd58f7fc953d6d95d2173ab9c4759eb26
