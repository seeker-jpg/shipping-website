export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  brand: string
  category: string
  color?: string
  colors?: string[]
  models?: string[]
  features: string[]
  specifications: Record<string, string>
  stock: number
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedModel?: string
}

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
    country: string
  }
  subtotal: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
  paymentMethod: string
  paymentId?: string
}

// Tous les modeles iPhone disponibles
export const iphoneModels = [
  "iPhone 17",
  "iPhone 17 Pro",
  "iPhone 17 Pro Max",
  "iPhone 17 Air",
  "iPhone 16",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
  "iPhone 15",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 14",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 13",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 12",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max"
]

// Toutes les couleurs de coques disponibles
export const caseColors = [
  { name: "Gris Taupe", hex: "#8B7D6B" },
  { name: "Noir", hex: "#1a1a1a" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Bleu Marine", hex: "#1a2744" },
  { name: "Bleu Royal", hex: "#4169E1" },
  { name: "Magenta", hex: "#C71585" },
  { name: "Vert Menthe", hex: "#98FB98" },
  { name: "Rose Pastel", hex: "#FFB6C1" },
  { name: "Rouge", hex: "#DC143C" },
  { name: "Lavande", hex: "#E6E6FA" },
  { name: "Peche", hex: "#FFDAB9" },
  { name: "Bleu Ciel", hex: "#87CEEB" },
  { name: "Vert Fonce", hex: "#2E8B57" },
  { name: "Blanc", hex: "#FFFFFF" }
]

// Product catalog - Accessoires mobiles Corely
export const products: Product[] = [
  // Coques iPhone - Silicone Premium
  {
    id: "coque-silicone-premium",
    name: "Coque iPhone Silicone Premium",
    description: "Coque de protection premium en silicone doux pour iPhone. Design elegant et protection maximale contre les chocs et les rayures. Disponible pour tous les modeles iPhone et en 14 couleurs tendance.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/images/image.png",
    images: ["/images/image.png"],
    brand: "Corely",
    category: "Coques",
    colors: caseColors.map(c => c.name),
    models: iphoneModels,
    features: [
      "Silicone premium ultra-doux",
      "Protection anti-choc renforcee",
      "Compatible MagSafe",
      "14 couleurs disponibles",
      "Tous modeles iPhone",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "iPhone 11 a iPhone 17",
      "Materiau": "Silicone premium",
      "Epaisseur": "1.5mm",
      "Protection": "Anti-choc MIL-STD-810G",
      "MagSafe": "Compatible",
      "Couleurs": "14 couleurs disponibles"
    },
    stock: 500,
    featured: true
  },
  {
    id: "coque-transparente",
    name: "Coque iPhone Transparente Crystal",
    description: "Coque transparente cristalline pour iPhone. Montrez le design original de votre iPhone tout en le protegeant. Anti-jaunissement garanti.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-transparente.png",
    images: ["/coque-transparente.png"],
    brand: "Corely",
    category: "Coques",
    colors: ["Transparent"],
    models: iphoneModels,
    features: [
      "Transparence cristalline",
      "Anti-jaunissement UV",
      "Protection coins renforces",
      "Ultra-leger 15g",
      "Tous modeles iPhone",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "iPhone 11 a iPhone 17",
      "Materiau": "TPU premium transparent",
      "Epaisseur": "1.2mm",
      "Protection": "Coins air-cushion",
      "Finition": "Crystal clear",
      "Poids": "15g"
    },
    stock: 350,
    featured: true
  },
  {
    id: "coque-magsafe-premium",
    name: "Coque iPhone MagSafe Premium",
    description: "Coque avec anneau MagSafe integre pour une compatibilite parfaite avec tous les accessoires MagSafe. Charge sans fil optimisee.",
    price: 4.99,
    originalPrice: 24.99,
    image: "/coque-magsafe.png",
    images: ["/coque-magsafe.png"],
    brand: "Corely",
    category: "Coques",
    colors: caseColors.map(c => c.name),
    models: iphoneModels.filter(m => !m.includes("11")),
    features: [
      "Aimants MagSafe integres",
      "Charge sans fil optimisee",
      "Alignement parfait",
      "Protection premium",
      "14 couleurs disponibles",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "iPhone 12 a iPhone 17",
      "Materiau": "Silicone + aimants N52",
      "MagSafe": "38 aimants integres",
      "Charge": "15W sans fil",
      "Protection": "Anti-choc",
      "Couleurs": "14 couleurs"
    },
    stock: 280,
    featured: true
  },
  // Cables
  {
    id: "cable-usb-c-lightning-1m",
    name: "Cable USB-C vers Lightning 1m",
    description: "Cable de charge rapide USB-C vers Lightning 1 metre. Charge rapide 20W pour tous les iPhone.",
    price: 2.99,
    originalPrice: 14.99,
    image: "/cable-lightning-1m.png",
    images: ["/cable-lightning-1m.png"],
    brand: "Corely",
    category: "Cables",
    features: [
      "Charge rapide 20W",
      "Longueur 1 metre",
      "Transfert donnees 480Mbps",
      "Cable tresse renforce",
      "Connecteurs aluminium",
      "Garantie 2 ans"
    ],
    specifications: {
      "Longueur": "1 metre",
      "Connecteurs": "USB-C vers Lightning",
      "Puissance": "20W max",
      "Transfert": "480 Mbps",
      "Materiau": "Nylon tresse",
      "Compatibilite": "iPhone 8 et plus"
    },
    stock: 450,
    featured: true
  },
  {
    id: "cable-usb-c-lightning-2m",
    name: "Cable USB-C vers Lightning 2m",
    description: "Cable de charge rapide USB-C vers Lightning 2 metres. Extra long pour plus de confort. Charge rapide 20W.",
    price: 3.99,
    originalPrice: 19.99,
    image: "/cable-lightning-2m.png",
    images: ["/cable-lightning-2m.png"],
    brand: "Corely",
    category: "Cables",
    features: [
      "Charge rapide 20W",
      "Longueur 2 metres",
      "Extra long confortable",
      "Tresse nylon renforcee",
      "Connecteurs dores",
      "Garantie 2 ans"
    ],
    specifications: {
      "Longueur": "2 metres",
      "Connecteurs": "USB-C vers Lightning",
      "Puissance": "20W max",
      "Transfert": "480 Mbps",
      "Materiau": "Nylon tresse premium",
      "Compatibilite": "iPhone 8 et plus"
    },
    stock: 380,
    featured: true
  },
  {
    id: "cable-usbc-usbc-1m",
    name: "Cable USB-C vers USB-C 1m 60W",
    description: "Cable USB-C vers USB-C 1 metre. Charge rapide 60W Power Delivery. Compatible iPhone 15+, iPad, MacBook, Samsung.",
    price: 2.99,
    originalPrice: 14.99,
    image: "/cable-usbc-1m.png",
    images: ["/cable-usbc-1m.png"],
    brand: "Corely",
    category: "Cables",
    features: [
      "Charge 60W PD",
      "Longueur 1 metre",
      "Transfert 10Gbps",
      "Universal USB-C",
      "Cable renforce",
      "Garantie 2 ans"
    ],
    specifications: {
      "Longueur": "1 metre",
      "Connecteurs": "USB-C vers USB-C",
      "Puissance": "60W PD 3.0",
      "Transfert": "10 Gbps USB 3.1",
      "Materiau": "PVC renforce",
      "Compatibilite": "Universelle USB-C"
    },
    stock: 420,
    featured: false
  },
  {
    id: "cable-usbc-usbc-2m",
    name: "Cable USB-C vers USB-C 2m 60W",
    description: "Cable USB-C vers USB-C 2 metres extra long. Charge rapide 60W Power Delivery pour tous vos appareils USB-C.",
    price: 3.99,
    originalPrice: 19.99,
    image: "/cable-usbc-2m.png",
    images: ["/cable-usbc-2m.png"],
    brand: "Corely",
    category: "Cables",
    features: [
      "Charge 60W PD",
      "Longueur 2 metres",
      "Extra long confortable",
      "Transfert 10Gbps",
      "Cable premium",
      "Garantie 2 ans"
    ],
    specifications: {
      "Longueur": "2 metres",
      "Connecteurs": "USB-C vers USB-C",
      "Puissance": "60W PD 3.0",
      "Transfert": "10 Gbps USB 3.1",
      "Materiau": "Nylon tresse",
      "Compatibilite": "Universelle USB-C"
    },
    stock: 310,
    featured: false
  },
  // Chargeurs
  {
    id: "chargeur-20w-usb-c",
    name: "Chargeur Mural 20W USB-C",
    description: "Chargeur mural compact 20W USB-C. Charge rapide Power Delivery pour iPhone et autres appareils. Ultra compact.",
    price: 9.99,
    originalPrice: 29.99,
    image: "/chargeur-20w.png",
    images: ["/chargeur-20w.png"],
    brand: "Corely",
    category: "Chargeurs",
    features: [
      "20W charge rapide",
      "USB-C Power Delivery",
      "Ultra compact",
      "Protection intelligente",
      "Compatible universel",
      "Garantie 2 ans"
    ],
    specifications: {
      "Puissance": "20W",
      "Ports": "1x USB-C",
      "Entree": "100-240V AC",
      "Protocoles": "PD 3.0, QC 3.0",
      "Dimensions": "30 x 30 x 30mm",
      "Securite": "Multi-protection 6 niveaux"
    },
    stock: 290,
    featured: true
  },
  {
    id: "chargeur-35w-dual-usbc",
    name: "Chargeur Mural 35W Double USB-C",
    description: "Chargeur mural 35W avec double port USB-C. Chargez deux appareils simultanement. Ideal pour iPhone + AirPods ou iPhone + Apple Watch.",
    price: 9.99,
    originalPrice: 34.99,
    image: "/chargeur-35w-dual.png",
    images: ["/chargeur-35w-dual.png"],
    brand: "Corely",
    category: "Chargeurs",
    features: [
      "35W puissance totale",
      "Double USB-C",
      "Charge 2 appareils",
      "GaN Technology",
      "Compact et leger",
      "Garantie 2 ans"
    ],
    specifications: {
      "Puissance": "35W (20W+15W ou 17.5W+17.5W)",
      "Ports": "2x USB-C",
      "Entree": "100-240V AC",
      "Protocoles": "PD 3.0, PPS",
      "Technologie": "GaN III",
      "Securite": "Protection surcharge"
    },
    stock: 220,
    featured: true
  },
  {
    id: "chargeur-65w-gan",
    name: "Chargeur GaN 65W Triple Port",
    description: "Chargeur GaN ultra-puissant 65W avec 2 USB-C + 1 USB-A. Chargez MacBook, iPhone et AirPods en meme temps!",
    price: 9.99,
    originalPrice: 49.99,
    image: "/chargeur-65w-gan.png",
    images: ["/chargeur-65w-gan.png"],
    brand: "Corely",
    category: "Chargeurs",
    features: [
      "65W puissance max",
      "2x USB-C + 1x USB-A",
      "Technologie GaN III",
      "Charge MacBook Pro",
      "Ultra compact",
      "Garantie 2 ans"
    ],
    specifications: {
      "Puissance": "65W max",
      "Ports": "2x USB-C + 1x USB-A",
      "Entree": "100-240V AC",
      "Protocoles": "PD 3.0, QC 4.0, PPS",
      "Technologie": "GaN III",
      "Compatibilite": "MacBook, iPhone, iPad, Samsung"
    },
    stock: 180,
    featured: true
  },
  {
    id: "chargeur-magsafe-15w",
    name: "Chargeur MagSafe Sans Fil 15W",
    description: "Chargeur sans fil MagSafe 15W pour iPhone. Alignement magnetique parfait, charge rapide sans fil optimisee.",
    price: 9.99,
    originalPrice: 39.99,
    image: "/chargeur-magsafe.png",
    images: ["/chargeur-magsafe.png"],
    brand: "Corely",
    category: "Chargeurs",
    features: [
      "15W charge sans fil",
      "Aimants MagSafe",
      "Alignement parfait",
      "LED indicateur",
      "Cable 1.5m inclus",
      "Garantie 2 ans"
    ],
    specifications: {
      "Puissance": "15W (MagSafe) / 7.5W (Qi)",
      "Type": "Sans fil magnetique",
      "Compatibilite": "iPhone 12 et plus",
      "Cable": "USB-C 1.5m inclus",
      "LED": "Indicateur de charge",
      "Securite": "Anti-surchauffe"
    },
    stock: 165,
    featured: true
  }
]

// Helper functions
export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  )
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CRL-${timestamp}-${random}`
}
