/**
 * Simulated hotel/destination data from Hotelbeds-like inventory
 * Types match the domain entities from copilot-instructions.md
 */

export type Destination = {
  id: number
  name: string
  location: {
    city: string
    country: string
    region?: string
    lat: number
    lng: number
  }
  type: 'hotel' | 'villa' | 'resort' | 'apartment'
  images: string[]
  starRating: 1 | 2 | 3 | 4 | 5
  amenities: string[]
  description: string
  pricePerNight: {
    amount: number
    currency: string
  }
  available: boolean
  tags: string[]
}

// Simulated data matching Hotelbeds-like structure
export const mockDestinations: Destination[] = [
  {
    id: 1,
    name: "Sunset Beach Resort",
    location: {
      city: "Malé",
      country: "Maldives",
      region: "South Malé Atoll",
      lat: 4.1755,
      lng: 73.5093
    },
    type: "resort",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800"
    ],
    starRating: 5,
    amenities: ["Piscine privée", "Spa", "Restaurant gastronomique", "Plongée", "WiFi gratuit", "Plage privée"],
    description: "Resort de luxe sur une île privée des Maldives avec villas sur pilotis et accès direct à la plage.",
    pricePerNight: {
      amount: 450,
      currency: "EUR"
    },
    available: true,
    tags: ["plage", "luxe", "mer", "lune de miel", "plongée"]
  },
  {
    id: 2,
    name: "Villa Azure Côte d'Azur",
    location: {
      city: "Nice",
      country: "France",
      region: "Provence-Alpes-Côte d'Azur",
      lat: 43.7102,
      lng: 7.2620
    },
    type: "villa",
    images: [
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    starRating: 5,
    amenities: ["Piscine à débordement", "Jardin privé", "Cuisine équipée", "Vue mer", "Parking privé", "Conciergerie"],
    description: "Villa d'exception avec vue panoramique sur la Méditerranée, idéale pour des vacances en famille.",
    pricePerNight: {
      amount: 890,
      currency: "EUR"
    },
    available: true,
    tags: ["villa", "mer", "luxe", "famille", "plage"]
  },
  {
    id: 3,
    name: "Hotel Marais Boutique Paris",
    location: {
      city: "Paris",
      country: "France",
      region: "Île-de-France",
      lat: 48.8566,
      lng: 2.3522
    },
    type: "hotel",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    ],
    starRating: 4,
    amenities: ["WiFi gratuit", "Petit-déjeuner", "Bar", "Concierge", "Climatisation", "Coffre-fort"],
    description: "Hôtel boutique au cœur du Marais, à proximité des sites emblématiques parisiens.",
    pricePerNight: {
      amount: 220,
      currency: "EUR"
    },
    available: true,
    tags: ["ville", "culture", "shopping", "monuments"]
  },
  {
    id: 4,
    name: "Ocean View Resort Zanzibar",
    location: {
      city: "Nungwi",
      country: "Tanzanie",
      region: "Zanzibar",
      lat: -5.7265,
      lng: 39.2925
    },
    type: "resort",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
    ],
    starRating: 4,
    amenities: ["Plage privée", "Piscine", "Restaurant", "Spa", "Plongée avec tuba", "WiFi gratuit"],
    description: "Resort en bord de plage avec eaux turquoise et sable blanc, parfait pour la détente.",
    pricePerNight: {
      amount: 180,
      currency: "EUR"
    },
    available: true,
    tags: ["plage", "mer", "exotique", "détente", "plongée"]
  },
  {
    id: 5,
    name: "Le Cap Luxury Suites",
    location: {
      city: "Le Cap",
      country: "Afrique du Sud",
      region: "Western Cape",
      lat: -33.9249,
      lng: 18.4241
    },
    type: "hotel",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"
    ],
    starRating: 5,
    amenities: ["Piscine sur le toit", "Spa", "Restaurant étoilé", "Salle de sport", "Conciergerie", "Vue sur Table Mountain"],
    description: "Suites de luxe avec vue imprenable sur Table Mountain et l'océan Atlantique.",
    pricePerNight: {
      amount: 320,
      currency: "EUR"
    },
    available: true,
    tags: ["ville", "mer", "montagne", "luxe", "aventure"]
  },
  {
    id: 6,
    name: "Santorini Sunset Villas",
    location: {
      city: "Oia",
      country: "Grèce",
      region: "Santorin",
      lat: 36.4618,
      lng: 25.3753
    },
    type: "villa",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800"
    ],
    starRating: 5,
    amenities: ["Piscine privée à débordement", "Jacuzzi", "Terrasse", "Vue sur la caldeira", "Cuisine équipée", "WiFi"],
    description: "Villas traditionnelles avec vue spectaculaire sur les couchers de soleil de Santorin.",
    pricePerNight: {
      amount: 650,
      currency: "EUR"
    },
    available: true,
    tags: ["mer", "romantique", "coucher de soleil", "luxe", "île"]
  },
  {
    id: 7,
    name: "Bali Jungle Retreat",
    location: {
      city: "Ubud",
      country: "Indonésie",
      region: "Bali",
      lat: -8.5069,
      lng: 115.2625
    },
    type: "resort",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"
    ],
    starRating: 4,
    amenities: ["Spa wellness", "Yoga", "Piscine naturelle", "Restaurant bio", "Excursions", "Méditation"],
    description: "Retraite au cœur de la jungle balinaise, idéale pour la reconnexion avec la nature.",
    pricePerNight: {
      amount: 165,
      currency: "EUR"
    },
    available: true,
    tags: ["nature", "wellness", "yoga", "détente", "jungle"]
  },
  {
    id: 8,
    name: "Dubai Marina Apartment",
    location: {
      city: "Dubaï",
      country: "Émirats arabes unis",
      region: "Dubai Marina",
      lat: 25.0805,
      lng: 55.1406
    },
    type: "apartment",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    ],
    starRating: 4,
    amenities: ["Piscine", "Salle de sport", "Parking", "Cuisine équipée", "Balcon vue marina", "WiFi haut débit"],
    description: "Appartement moderne dans la prestigieuse Dubai Marina, proche des plages et centres commerciaux.",
    pricePerNight: {
      amount: 280,
      currency: "EUR"
    },
    available: true,
    tags: ["ville", "moderne", "shopping", "plage", "luxe"]
  },
  {
    id: 9,
    name: "Château de la Loire Suite",
    location: {
      city: "Amboise",
      country: "France",
      region: "Centre-Val de Loire",
      lat: 47.4127,
      lng: 0.9811
    },
    type: "hotel",
    images: [
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    starRating: 5,
    amenities: ["Restaurant gastronomique", "Spa", "Jardin à la française", "Cave à vin", "Conciergerie", "Parking"],
    description: "Hôtel historique dans un château du XVIe siècle au cœur de la vallée de la Loire.",
    pricePerNight: {
      amount: 420,
      currency: "EUR"
    },
    available: true,
    tags: ["château", "histoire", "gastronomie", "vin", "culture"]
  },
  {
    id: 10,
    name: "Seychelles Paradise Beach Villa",
    location: {
      city: "La Digue",
      country: "Seychelles",
      region: "La Digue",
      lat: -4.3594,
      lng: 55.8387
    },
    type: "villa",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
    ],
    starRating: 5,
    amenities: ["Plage privée", "Piscine", "Cuisine équipée", "Vélos inclus", "Snorkeling", "Terrasse panoramique"],
    description: "Villa exclusive sur l'île de La Digue avec accès direct à une des plus belles plages du monde.",
    pricePerNight: {
      amount: 780,
      currency: "EUR"
    },
    available: true,
    tags: ["plage", "île", "paradis", "luxe", "lune de miel"]
  },
  {
    id: 11,
    name: "Tokyo Urban Hotel",
    location: {
      city: "Tokyo",
      country: "Japon",
      region: "Shibuya",
      lat: 35.6762,
      lng: 139.6503
    },
    type: "hotel",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
    ],
    starRating: 4,
    amenities: ["WiFi gratuit", "Restaurant japonais", "Bar sur le toit", "Conciergerie", "Salle de sport", "Onsen"],
    description: "Hôtel contemporain au cœur de Shibuya, alliant tradition japonaise et modernité.",
    pricePerNight: {
      amount: 195,
      currency: "EUR"
    },
    available: true,
    tags: ["ville", "culture", "moderne", "gastronomie", "shopping"]
  },
  {
    id: 12,
    name: "Alpes Chalet Premium",
    location: {
      city: "Chamonix",
      country: "France",
      region: "Auvergne-Rhône-Alpes",
      lat: 45.9237,
      lng: 6.8694
    },
    type: "villa",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    starRating: 5,
    amenities: ["Sauna", "Jacuzzi", "Cheminée", "Cuisine équipée", "Ski in/out", "Vue Mont-Blanc"],
    description: "Chalet de luxe face au Mont-Blanc, accès direct aux pistes de ski.",
    pricePerNight: {
      amount: 950,
      currency: "EUR"
    },
    available: false,
    tags: ["montagne", "ski", "luxe", "hiver", "chalet"]
  }
]

/**
 * Simulate API call to fetch destinations with filters
 */
export async function searchDestinations(filters?: {
  destination?: string
  checkIn?: Date
  checkOut?: Date
  guests?: number
  type?: string[]
  maxPrice?: number
}): Promise<Destination[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  let results = mockDestinations

  // Filter by availability
  results = results.filter(d => d.available)

  // Filter by destination (city or country)
  if (filters?.destination) {
    const query = filters.destination.toLowerCase()
    results = results.filter(d =>
      d.location.city.toLowerCase().includes(query) ||
      d.location.country.toLowerCase().includes(query) ||
      d.name.toLowerCase().includes(query) ||
      d.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Filter by type
  if (filters?.type && filters.type.length > 0) {
    results = results.filter(d => filters.type!.includes(d.type))
  }

  // Filter by max price
  if (filters?.maxPrice) {
    results = results.filter(d => d.pricePerNight.amount <= filters.maxPrice!)
  }

  // Sort by price (ascending)
  results.sort((a, b) => a.pricePerNight.amount - b.pricePerNight.amount)

  return results
}

/**
 * Get single destination by ID
 */
export async function getDestinationById(id: number): Promise<Destination | null> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockDestinations.find(d => d.id === id) || null
}
