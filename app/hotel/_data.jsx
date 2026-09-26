export const CONTACT = {
  phone: "9993542874",
  phoneHref: "tel:+919993542874",
  email: "hotel@7vachan.com",
  address: "7 Vachan Marriage Hall, Satna, Kothi Road, near Lovedale School, Bagha, Madhya Pradesh 485001",
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  reception: "Open 24 hours",
};

const img = (id) => `/images/${id.replace('photo-', '')}.jpg`;

export const rooms = [
  {
    slug: "deluxe",
    name: "Deluxe",
    price: 1200,
    size: "240 sq ft",
    guests: 2,
    category: "Deluxe",
    rating: 4.5,
    image: img("photo-1611892440504-42a792e24d32", 1200),
    gallery: [
      img("photo-1611892440504-42a792e24d32", 1600),
      img("photo-1618773928121-c32242e63f39", 1600),
      img("photo-1595576508898-0ad5c879a061", 1600),
    ],
    description: "Big rooms with every essential facility, dressed in warm ivory tones.",
    longDescription:
      "A serene retreat dressed in warm ivory tones and hand-finished wood. The Deluxe pairs timeless comfort with thoughtful modern touches — a plush king bed, a deep soaking bathtub, and morning light that pours through tall windows. Ideal for couples and solo travellers who want everything close at hand.",
    amenities: ["Free WiFi", "Smart TV", "Bathtub", "Coffee Maker", "Work Desk"],
  },
  {
    slug: "executive",
    name: "Executive",
    price: 1800,
    size: "320 sq ft",
    guests: 2,
    category: "Executive",
    rating: 4.6,
    image: img("photo-1590490360182-c33d57733427", 1200),
    gallery: [
      img("photo-1590490360182-c33d57733427", 1600),
      img("photo-1445019980597-93fa8acb246c", 1600),
      img("photo-1582719478250-c89cae4dc85b", 1600),
    ],
    description: "A spacious room with a sitting alcove and sweeping city views.",
    longDescription:
      "Step up into generous space and quiet luxury. The Executive room features a sitting alcove, a marble-finished bathroom with a rain shower, and curated details that make every stay feel effortless. The desk corner is built for travellers who mix business with rest.",
    amenities: ["Free WiFi", "Smart TV", "Rain Shower", "Coffee Maker", "Work Desk", "Mini Bar"],
  },
  {
    slug: "family",
    name: "Family",
    price: 2500,
    size: "480 sq ft",
    guests: 4,
    category: "Family",
    rating: 4.7,
    image: img("photo-1566665797739-1674de7a421a", 1200),
    gallery: [
      img("photo-1566665797739-1674de7a421a", 1600),
      img("photo-1611892440504-42a792e24d32", 1600),
      img("photo-1582719478250-c89cae4dc85b", 1600),
    ],
    description: "Room to stretch out — king bed, twin beds and space for everyone.",
    longDescription:
      "Designed for families who travel together. A king bed for the parents, twin beds for the kids, and enough floor space that nobody is climbing over a suitcase. Two wash areas keep mornings moving, and the lounge corner is perfect for evening board games and room-service dinners.",
    amenities: ["Free WiFi", "Smart TV", "Bathtub", "Coffee Maker", "Mini Bar", "Extra Bedding"],
  },
  {
    slug: "deluxe-city-view",
    name: "Deluxe City View",
    price: 3500,
    size: "560 sq ft",
    guests: 3,
    category: "Luxury",
    rating: 4.8,
    image: img("photo-1618773928121-c32242e63f39", 1200),
    gallery: [
      img("photo-1618773928121-c32242e63f39", 1600),
      img("photo-1578683010236-d716f9a3f461", 1600),
      img("photo-1590490360182-c33d57733427", 1600),
    ],
    description: "High-floor luxury with a private lounge and panoramic city views.",
    longDescription:
      "Opulence with a view. This high-floor room opens into a private sitting lounge wrapped in silk and brass, with sweeping views across Satna. A spa-inspired bathroom, lounge access and service around the clock make it the address for anniversaries and quiet celebrations.",
    amenities: ["Free WiFi", "Smart TV", "Bathtub", "Coffee Maker", "Work Desk", "Mini Bar", "Lounge Access"],
  },
  {
    slug: "luxury",
    name: "Luxury",
    price: 4500,
    size: "1100 sq ft",
    guests: 4,
    category: "Luxury",
    rating: 5.0,
    image: img("photo-1578683010236-d716f9a3f461", 1200),
    gallery: [
      img("photo-1578683010236-d716f9a3f461", 1600),
      img("photo-1566665797739-1674de7a421a", 1600),
      img("photo-1618773928121-c32242e63f39", 1600),
    ],
    description: "Our crown jewel — terrace, jacuzzi and interiors crafted by artisans.",
    longDescription:
      "Our crown jewel. A grand suite with a private jacuzzi terrace, a piano lounge, and interiors crafted by master artisans. Panoramic views, a dedicated butler line and breakfast served where you like it — the Luxury suite is reserved for moments that deserve legend.",
    amenities: ["Free WiFi", "Smart TV", "Bathtub", "Coffee Maker", "Work Desk", "Mini Bar", "Lounge Access", "Private Butler", "Jacuzzi"],
  },
];

export const offers = [
  {
    slug: "dussehra-sale",
    title: "Dussehra Sale",
    text: "Flat 20% off all suites booked for the Dussehra festive week — breakfast included, late checkout on request.",
    validity: "Valid 1–31 October 2026",
    image: img("photo-1519167758481-83f550bb49b3", 1200),
  },
  {
    slug: "weekday-lunch-thali",
    title: "Weekday Lunch Thali",
    text: "A full vegetarian thali, Monday to Friday, noon to 3 PM.",
    validity: "Monday–Friday, 12:00–3:00 PM",
    image: img("photo-1546833999-b9f581a1996d", 1200),
  },
  {
    slug: "book-two-functions",
    title: "Book Two Functions",
    text: "Hold your Mehendi and Sangeet with us alongside the wedding and the terrace hire is complimentary.",
    validity: "Weddings booked for 2026–27",
    image: img("photo-1519741497674-611481863552", 1200),
  },
  {
    slug: "long-stay",
    title: "Long Stay, Lower Rate",
    text: "Stay five nights or more and unlock 15% off the best available rate — the longer you linger, the less you pay.",
    validity: "Year-round, all room types",
    image: img("photo-1618773928121-c32242e63f39", 1200),
  },
  {
    slug: "sunday-family-feast",
    title: "Sunday Family Feast",
    text: "A leisurely Sunday buffet for the whole family, with live counters and desserts the kids will remember.",
    validity: "Sundays, 12:00–4:00 PM",
    image: img("photo-1555939594-58d7cb561ad1", 1200),
  },
];

export const reviews = [
  {
    name: "Priya Sharma",
    rating: 4.5,
    date: "August 2026",
    title: "The terrace dinner at sunset was unforgettable",
    text: "The Deluxe City View room was spotless and the terrace dinner at sunset was the highlight of our Satna trip. Staff remembered every small request — from extra pillows to the exact way we take our tea.",
  },
  {
    name: "Rahul Verma",
    rating: 4.0,
    date: "July 2026",
    title: "Comfortable, quiet, genuinely well run",
    text: "Comfortable beds, quick room service and a genuinely quiet floor. Check-in took five minutes at midnight. The weekday lunch thali alone is worth a visit.",
  },
];

export const faqs = [
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 12:00 PM and check-out is until 11:00 AM. Early check-in and late check-out are possible on request, subject to availability — just call us on 9993542874 before you arrive.",
  },
  {
    q: "Is parking available at the property?",
    a: "Yes. We offer free on-site parking for all resident guests, with space for wedding and banquet guests during functions. The lot is attended around the clock.",
  },
  {
    q: "Is WiFi free, and how fast is it?",
    a: "High-speed WiFi is complimentary in every room and across the estate — lobby, restaurant, banquet halls and the pool deck. Streaming and video calls are comfortably supported.",
  },
  {
    q: "Are pets allowed?",
    a: "We love animals, but with the exception of registered service animals we are unable to host pets inside the rooms and restaurants. Please call us and we will happily suggest nearby boarding options.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Reservations can be cancelled free of charge up to 48 hours before check-in. Cancellations within 48 hours are charged one night's stay. No-shows are charged the full first night.",
  },
  {
    q: "Can I get an extra bed in my room?",
    a: "Yes. An extra bed can be arranged in Family, Deluxe City View and Luxury rooms for ₹500 per night, including breakfast. Please mention it while booking so the room is prepared in advance.",
  },
];

export const galleryTabs = ["Rooms", "Lobby", "Pool", "Dining"];

export const galleryImages = [
  { tab: "Rooms", src: img("photo-1611892440504-42a792e24d32", 1200), alt: "Deluxe room" },
  { tab: "Rooms", src: img("photo-1590490360182-c33d57733427", 1200), alt: "Executive room" },
  { tab: "Rooms", src: img("photo-1566665797739-1674de7a421a", 1200), alt: "Family room" },
  { tab: "Rooms", src: img("photo-1578683010236-d716f9a3f461", 1200), alt: "Luxury suite" },
  { tab: "Rooms", src: img("photo-1618773928121-c32242e63f39", 1200), alt: "Deluxe City View room" },
  { tab: "Rooms", src: img("photo-1618773928121-c32242e63f39", 1200), alt: "Suite bedroom detail" },
  { tab: "Lobby", src: img("photo-1564501049412-61c2a3083791", 1200), alt: "Hotel lobby" },
  { tab: "Lobby", src: img("photo-1542314831-068cd1dbfeeb", 1200), alt: "Hotel facade at dusk" },
  { tab: "Lobby", src: img("photo-1519167758481-83f550bb49b3", 1200), alt: "Chandelier-lit banquet hall" },
  { tab: "Pool", src: img("photo-1571896349842-33c89424de2d", 1200), alt: "Swimming pool" },
  { tab: "Pool", src: img("photo-1540541338287-41700207dee6", 1200), alt: "Pool deck at evening" },
  { tab: "Dining", src: img("photo-1414235077428-338989a2e8c0", 1200), alt: "Evening terrace dining" },
  { tab: "Dining", src: img("photo-1552566626-52f8b828add9", 1200), alt: "Restaurant interior" },
  { tab: "Dining", src: img("photo-1546833999-b9f581a1996d", 1200), alt: "Vegetarian thali" },
  { tab: "Dining", src: img("photo-1517248135467-4c7edcad34c4", 1200), alt: "Dining room" },
];

export const HERO_IMAGES = {
  banquet: img("photo-1519167758481-83f550bb49b3", 2000),
  terrace: img("photo-1414235077428-338989a2e8c0", 2000),
  lobby: img("photo-1564501049412-61c2a3083791", 2000),
  pool: img("photo-1571896349842-33c89424de2d", 1600),
};

export const facilities = [
  "Free WiFi",
  "Swimming Pool",
  "Restaurant",
  "Parking",
  "Room Service",
  "Power Backup",
];
