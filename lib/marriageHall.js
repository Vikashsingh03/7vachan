const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const packages = [
  {
    name: "Silver",
    guests: "100–300 guests",
    tagline: "Intimate celebrations, done beautifully",
    features: [
      "Elegant stage & entrance decor",
      "Buffet dinner for guests",
      "Standard lighting design",
      "Bridal changing room",
      "Complimentary parking",
      "Dedicated event coordinator",
    ],
    popular: false,
  },
  {
    name: "Premium",
    guests: "500–900 guests",
    tagline: "Grand weddings with signature styling",
    features: [
      "Designer mandap & stage decor",
      "Multi-cuisine catering",
      "Ambient + fairy lighting",
      "Bridal suite with lounge",
      "Guest welcome counters",
      "Dedicated event manager",
      "Fireworks entry option",
    ],
    popular: false,
  },
  {
    name: "Royal",
    guests: "800–1,200 guests",
    tagline: "A palace-wedding experience",
    features: [
      "Royal-themed full-venue decor",
      "Live counters & premium catering",
      "Chandelier & intelligent lighting",
      "Luxury bridal & groom suites",
      "Valet parking for guests",
      "Wedding planner on-site",
      "Cold pyros & flower shower",
    ],
    popular: true,
  },
  {
    name: "Gold",
    guests: "500–800 guests",
    tagline: "Classic grandeur with golden touches",
    features: [
      "Gold-accent decor theme",
      "Curated wedding menu",
      "Warm architectural lighting",
      "Bridal suite",
      "Guest hospitality desk",
      "Day-of coordination",
    ],
    popular: false,
  },
];

export const themes = [
  {
    name: "Ivory & Pearl",
    category: "Classic",
    image: img("1519167758481-83f550bb49b3"),
    palette: ["#F5F0E6", "#EDE4D3", "#D9C7A7", "#B89B5E", "#8C6F3F"],
    tags: ["Elegant", "Timeless", "Day wedding"],
  },
  {
    name: "Maharaja Court",
    category: "Royal",
    image: img("1511795409834-efc3b29e7f5e"),
    palette: ["#7A1F2B", "#A8323E", "#C19A3D", "#E8C97A", "#2B1B12"],
    tags: ["Regal", "Dramatic", "Evening"],
  },
  {
    name: "Rajputana Heritage",
    category: "Traditional",
    image: img("1583939003579-730e3918a45a"),
    palette: ["#9C3D2E", "#D4A017", "#F3E5C0", "#5B2A1E", "#2E4A3D"],
    tags: ["Cultural", "Vibrant"],
  },
  {
    name: "Modern Minimal",
    category: "Minimal",
    image: img("1522673601151-83f305a2c6f2"),
    palette: ["#F7F5F0", "#E5E0D5", "#C9C2B4", "#8A8478", "#3A3733"],
    tags: ["Clean", "Contemporary"],
  },
  {
    name: "Floral Fantasy",
    category: "Floral",
    image: img("1465495976277-4387d4b0b4c6"),
    palette: ["#F9E8EC", "#F2C6D0", "#D98AA5", "#7FB069", "#4A6741"],
    tags: ["Romantic", "Fresh", "Day wedding"],
  },
  {
    name: "Golden Opulence",
    category: "Luxury",
    image: img("1519225421980-715cb0215aed"),
    palette: ["#1F1A14", "#3A2E1C", "#8C6F3F", "#C19A3D", "#F0DDA8"],
    tags: ["Luxe", "Evening glam"],
  },
  {
    name: "Rustic Outdoor",
    category: "Outdoor",
    image: img("1469371670807-013ccf25f16a"),
    palette: ["#6B7F59", "#A3B18A", "#DAD7CD", "#8C6A4F", "#3F4A3C"],
    tags: ["Garden", "Bohemian"],
  },
  {
    name: "Pastel Dream",
    category: "Modern",
    image: img("1520854221256-17451cc331bf"),
    palette: ["#F6E7E4", "#EAD9C2", "#D9B8A6", "#A8C3B9", "#7D9B8E"],
    tags: ["Soft", "Daylight", "Mehendi"],
  },
];

export const themeCategories = [
  "All",
  "Classic",
  "Royal",
  "Traditional",
  "Modern",
  "Floral",
  "Luxury",
  "Minimal",
  "Outdoor",
];

export const galleryImages = [
  { src: img("1519167758481-83f550bb49b3"), category: "Venue", label: "Grand entrance" },
  { src: img("1511795409834-efc3b29e7f5e"), category: "Ceremony", label: "Pheras under the stars" },
  { src: img("1465495976277-4387d4b0b4c6"), category: "Decor", label: "Floral mandap" },
  { src: img("1522673601151-83f305a2c6f2"), category: "Decor", label: "Minimal stage" },
  { src: img("1520854221256-17451cc331bf"), category: "Ceremony", label: "The couple" },
  { src: img("1583939003579-730e3918a45a"), category: "Ceremony", label: "Traditional rites" },
  { src: img("1591604466107-ec97de577aff"), category: "Venue", label: "Garden lawns" },
  { src: img("1469371670807-013ccf25f16a"), category: "Venue", label: "Outdoor setting" },
  { src: img("1519225421980-715cb0215aed"), category: "Decor", label: "Golden hour decor" },
  { src: img("1523438885200-e635ba2c371e"), category: "Ceremony", label: "Celebration" },
];

export const galleryCategories = ["All", "Decor", "Venue", "Ceremony"];

export const ratingSummary = {
  average: 4.8,
  total: 214,
  dist: [
    { stars: 5, pct: 82 },
    { stars: 4, pct: 12 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ],
};

export const mhReviews = [
  {
    name: "Priya & Aman Sharma",
    rating: 5,
    date: "February 2026",
    text: "The Royal decor theme looked straight out of a palace. Guests are still talking about the mandap and the food. Flawless coordination from entry to vidaai.",
  },
  {
    name: "Rohit Verma",
    rating: 5,
    date: "December 2025",
    text: "Booked for my sister's wedding — 900 guests and everything ran on time. The garden lawn at night with the lighting is unreal.",
  },
  {
    name: "Neha Gupta",
    rating: 4,
    date: "November 2025",
    text: "Beautiful venue and very professional team. The bridal suite was a lifesaver on the wedding day. Only wish the parking was a bit larger.",
  },
];

export const cuisines = [
  {
    name: "Rajasthani",
    image: img("1585937421612-70a008356fbe"),
    desc: "Royal thalis, dal-baati-churma and slow-cooked classics served the traditional way.",
    items: ["Dal Baati Churma", "Gatte ki Sabzi", "Ker Sangri", "Bajra Rotla"],
  },
  {
    name: "Mughlai",
    image: img("1601050690597-df0568f70950"),
    desc: "Rich gravies, dum biryanis and kebabs from live tandoor counters.",
    items: ["Murgh Malai Kebab", "Dum Biryani", "Shahi Paneer", "Nihari"],
  },
  {
    name: "Continental",
    image: img("1414235077428-338989a2e8c0"),
    desc: "Pastas, grills and plated fine-dining for cocktail evenings and receptions.",
    items: ["Alfredo Pasta", "Grilled Platters", "Risotto", "Dessert Trolley"],
  },
  {
    name: "Chaat Counters",
    image: img("1601050690597-df0568f70950"),
    desc: "Live chaat, pani-puri and regional street-food stations guests love.",
    items: ["Pani Puri", "Aloo Tikki", "Dahi Bhalla", "Jhal Muri"],
  },
  {
    name: "Desserts",
    image: img("1551024506-0bccd828d307"),
    desc: "Indian mithai and international patisserie to end the night sweetly.",
    items: ["Rasmalai Tres Leches", "Jalebi-Rabri", "Chocolate Fountain", "Kulfi Falooda"],
  },
];
