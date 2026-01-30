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
  features: string[]
  specifications: Record<string, string>
  stock: number
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
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

// Product catalog - Accessoires mobiles Corely
export const products: Product[] = [
  // Coques iPhone
  {
    id: "coque-iphone-16-pro-max",
    name: "Coque iPhone 16 Pro Max Premium",
    description: "Coque de protection premium pour iPhone 16 Pro Max. Design elegant et protection maximale contre les chocs et les rayures.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-iphone-16-pro-max.png",
    images: ["/coque-iphone-16-pro-max.png"],
    brand: "Corely",
    category: "Coques",
    color: "Noir",
    features: [
      "Protection anti-choc",
      "Design ultra-fin",
      "Compatible MagSafe",
      "Materiau premium",
      "Boutons reactifs",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "iPhone 16 Pro Max",
      "Materiau": "TPU + PC",
      "Epaisseur": "1.5mm",
      "Protection": "Anti-choc MIL-STD-810G",
      "MagSafe": "Compatible",
      "Couleur": "Noir"
    },
    stock: 127,
    featured: true
  },
  {
    id: "coque-iphone-15-pro-max",
    name: "Coque iPhone 15 Pro Max Elegante",
    description: "Coque elegante pour iPhone 15 Pro Max. Protection optimale avec un look raffine.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-iphone-15-pro-max.png",
    images: ["/coque-iphone-15-pro-max.png"],
    brand: "Corely",
    category: "Coques",
    color: "Noir",
    features: [
      "Design minimaliste",
      "Protection renforcee",
      "Anti-traces de doigts",
      "Grip ameliore",
      "Decoupe camera precise",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "iPhone 15 Pro Max",
      "Materiau": "Silicone souple",
      "Epaisseur": "1.2mm",
      "Protection": "Anti-rayures",
      "Finition": "Mate soft-touch",
      "Couleur": "Noir"
    },
    stock: 89,
    featured: true
  },
  {
    id: "coque-iphone-12-11",
    name: "Coque iPhone 12/11 Classic",
    description: "Coque classique compatible iPhone 12 et iPhone 11. Protection quotidienne fiable.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-iphone-12-11.png",
    images: ["/coque-iphone-12-11.png"],
    brand: "Corely",
    category: "Coques",
    color: "Transparent",
    features: [
      "Compatible iPhone 12 & 11",
      "Transparent cristal",
      "Anti-jaunissement",
      "Protection coins",
      "Leger et discret",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "iPhone 12 / iPhone 11",
      "Materiau": "TPU transparent",
      "Epaisseur": "1.0mm",
      "Protection": "Coins renforces",
      "Finition": "Cristal transparent",
      "Couleur": "Transparent"
    },
    stock: 156,
    featured: true
  },
  {
    id: "coque-noir",
    name: "Coque Universelle Noir Mat",
    description: "Coque noire mate universelle. Style sobre et elegant pour votre smartphone.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-noir.png",
    images: ["/coque-noir.png"],
    brand: "Corely",
    category: "Coques",
    color: "Noir",
    features: [
      "Finition mate premium",
      "Anti-traces",
      "Grip optimal",
      "Ultra-leger",
      "Style minimaliste",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "Universelle",
      "Materiau": "Silicone mat",
      "Epaisseur": "1.2mm",
      "Protection": "Standard",
      "Finition": "Mate",
      "Couleur": "Noir"
    },
    stock: 203,
    featured: true
  },
  {
    id: "coque-blanc",
    name: "Coque Universelle Blanc Pur",
    description: "Coque blanche elegante. Look frais et moderne pour personnaliser votre telephone.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-blanc.png",
    images: ["/coque-blanc.png"],
    brand: "Corely",
    category: "Coques",
    color: "Blanc",
    features: [
      "Blanc immacule",
      "Facile a nettoyer",
      "Resistant aux UV",
      "Design epure",
      "Touch doux",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "Universelle",
      "Materiau": "Silicone premium",
      "Epaisseur": "1.2mm",
      "Protection": "Standard",
      "Finition": "Satinee",
      "Couleur": "Blanc"
    },
    stock: 178,
    featured: false
  },
  {
    id: "coque-rose",
    name: "Coque Universelle Rose Pastel",
    description: "Coque rose pastel tendance. Couleur douce et feminine pour sublimer votre smartphone.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-rose.png",
    images: ["/coque-rose.png"],
    brand: "Corely",
    category: "Coques",
    color: "Rose",
    features: [
      "Rose pastel tendance",
      "Couleur stable",
      "Toucher velours",
      "Style feminin",
      "Ultra-doux",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "Universelle",
      "Materiau": "Silicone soft",
      "Epaisseur": "1.2mm",
      "Protection": "Standard",
      "Finition": "Velours",
      "Couleur": "Rose pastel"
    },
    stock: 134,
    featured: false
  },
  {
    id: "coque-bleu-marine",
    name: "Coque Universelle Bleu Marine",
    description: "Coque bleu marine sophistiquee. Couleur classique et intemporelle.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-bleu-marine.png",
    images: ["/coque-bleu-marine.png"],
    brand: "Corely",
    category: "Coques",
    color: "Bleu Marine",
    features: [
      "Bleu marine elegant",
      "Style professionnel",
      "Resistant aux taches",
      "Grip securise",
      "Finition premium",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "Universelle",
      "Materiau": "Silicone premium",
      "Epaisseur": "1.2mm",
      "Protection": "Standard",
      "Finition": "Satinee",
      "Couleur": "Bleu marine"
    },
    stock: 145,
    featured: false
  },
  {
    id: "coque-rouge",
    name: "Coque Universelle Rouge Passion",
    description: "Coque rouge passion audacieuse. Pour ceux qui osent la couleur!",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-rouge.png",
    images: ["/coque-rouge.png"],
    brand: "Corely",
    category: "Coques",
    color: "Rouge",
    features: [
      "Rouge vif intense",
      "Style audacieux",
      "Couleur durable",
      "Anti-derapant",
      "Impact visuel",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "Universelle",
      "Materiau": "Silicone premium",
      "Epaisseur": "1.2mm",
      "Protection": "Standard",
      "Finition": "Brillante",
      "Couleur": "Rouge"
    },
    stock: 98,
    featured: false
  },
  {
    id: "coque-vert",
    name: "Coque Universelle Vert Nature",
    description: "Coque verte naturelle. Inspiree de la nature pour un style eco-friendly.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-vert.png",
    images: ["/coque-vert.png"],
    brand: "Corely",
    category: "Coques",
    color: "Vert",
    features: [
      "Vert nature apaisant",
      "Style eco-friendly",
      "Materiau durable",
      "Confort optimal",
      "Design organique",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "Universelle",
      "Materiau": "Silicone bio",
      "Epaisseur": "1.2mm",
      "Protection": "Standard",
      "Finition": "Mate naturelle",
      "Couleur": "Vert"
    },
    stock: 112,
    featured: false
  },
  {
    id: "coque-violet",
    name: "Coque Universelle Violet Mystique",
    description: "Coque violette mystique. Couleur unique et originale pour se demarquer.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/coque-violet.png",
    images: ["/coque-violet.png"],
    brand: "Corely",
    category: "Coques",
    color: "Violet",
    features: [
      "Violet mystique",
      "Style unique",
      "Couleur profonde",
      "Toucher agreable",
      "Look premium",
      "Garantie 1 an"
    ],
    specifications: {
      "Compatibilite": "Universelle",
      "Materiau": "Silicone premium",
      "Epaisseur": "1.2mm",
      "Protection": "Standard",
      "Finition": "Satinee",
      "Couleur": "Violet"
    },
    stock: 87,
    featured: false
  },
  // Cables
  {
    id: "cable-usb-c-lightning-2m",
    name: "Cable USB-C vers Lightning 2m",
    description: "Cable de charge rapide USB-C vers Lightning 2 metres. Parfait pour iPhone avec charge rapide 20W.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/cable-usb-c-lightning-2m.png",
    images: ["/cable-usb-c-lightning-2m.png"],
    brand: "Corely",
    category: "Cables",
    features: [
      "Charge rapide 20W",
      "Longueur 2 metres",
      "Transfert donnees",
      "Tresse nylon renforcee",
      "Connecteurs aluminium",
      "Garantie 2 ans"
    ],
    specifications: {
      "Longueur": "2 metres",
      "Connecteurs": "USB-C vers Lightning",
      "Puissance": "20W max",
      "Transfert": "480 Mbps",
      "Materiau": "Nylon tresse",
      "Compatibilite": "iPhone 8 et plus"
    },
    stock: 234,
    featured: true
  },
  {
    id: "cable-usbc-60w",
    name: "Cable USB-C 60W Ultra Rapide",
    description: "Cable USB-C vers USB-C 60W pour charge ultra rapide. Compatible MacBook, iPad, Samsung et plus.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/cable-usbc-60w.png",
    images: ["/cable-usbc-60w.png"],
    brand: "Corely",
    category: "Cables",
    features: [
      "Charge 60W ultra rapide",
      "USB-C vers USB-C",
      "Compatible Power Delivery",
      "Cable renforce",
      "Transfert 10Gbps",
      "Garantie 2 ans"
    ],
    specifications: {
      "Longueur": "1.5 metres",
      "Connecteurs": "USB-C vers USB-C",
      "Puissance": "60W PD",
      "Transfert": "10 Gbps USB 3.1",
      "Materiau": "PVC renforce",
      "Compatibilite": "Universelle USB-C"
    },
    stock: 189,
    featured: true
  },
  // Chargeurs
  {
    id: "chargeur-40w-usb-c",
    name: "Chargeur Mural 40W Double USB-C",
    description: "Chargeur mural compact 40W avec double port USB-C. Chargez deux appareils simultanement a pleine vitesse.",
    price: 4.99,
    originalPrice: 19.99,
    image: "/chargeur-40w-usb-c.png",
    images: ["/chargeur-40w-usb-c.png"],
    brand: "Corely",
    category: "Chargeurs",
    features: [
      "40W puissance totale",
      "Double USB-C",
      "Charge deux appareils",
      "Compact et leger",
      "Protection surcharge",
      "Garantie 2 ans"
    ],
    specifications: {
      "Puissance": "40W total (20W x2)",
      "Ports": "2x USB-C",
      "Entree": "100-240V AC",
      "Protocoles": "PD 3.0, QC 4.0",
      "Dimensions": "45 x 45 x 28mm",
      "Securite": "Multi-protection"
    },
    stock: 156,
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

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
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

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CRL-${timestamp}-${random}`
}
