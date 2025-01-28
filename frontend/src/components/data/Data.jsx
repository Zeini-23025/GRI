// Navigation links
export const nav = [
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
