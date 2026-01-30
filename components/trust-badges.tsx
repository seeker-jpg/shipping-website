import { Shield, Truck, RotateCcw, Headphones, CreditCard, Lock, CheckCircle } from "lucide-react"

interface TrustBadgesProps {
  variant?: "horizontal" | "grid" | "compact"
  className?: string
}

const badges = [
  {
    icon: Lock,
    title: "Paiement Sécurisé",
    description: "SSL 256-bit",
    color: "text-green-400",
    bgColor: "from-green-500/10 to-green-500/5",
    borderColor: "border-green-500/30",
  },
  {
    icon: Truck,
    title: "Livraison Gratuite",
    description: "Partout en France",
    color: "text-cyan-400",
    bgColor: "from-cyan-500/10 to-cyan-500/5",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: RotateCcw,
    title: "Retours 30 Jours",
    description: "Satisfait ou remboursé",
    color: "text-purple-400",
    bgColor: "from-purple-500/10 to-purple-500/5",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Assistance rapide",
    color: "text-pink-400",
    bgColor: "from-pink-500/10 to-pink-500/5",
    borderColor: "border-pink-500/30",
  },
]

export function TrustBadges({ variant = "horizontal", className = "" }: TrustBadgesProps) {
  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <badge.icon className={`w-4 h-4 ${badge.color} group-hover:scale-110 transition-transform`} />
            <span className="font-medium">{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "grid") {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div
            key={badge.title}
            className={`
              group flex flex-col items-center text-center p-5 rounded-xl
              bg-gradient-to-br ${badge.bgColor} border ${badge.borderColor}
              hover-lift-sm hover:border-opacity-60
              transition-all duration-300 cursor-default
              fade-in-up stagger-${index + 1}
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-3
              bg-gradient-to-br ${badge.bgColor} ${badge.color}
              group-hover:scale-110 transition-transform duration-300
            `}>
              <badge.icon className="w-6 h-6 icon-spin-hover" />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-1">{badge.title}</h4>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        ))}
      </div>
    )
  }

  // Horizontal variant (default)
  return (
    <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="group flex items-center gap-3 hover-lift-sm transition-all duration-300"
        >
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center
            bg-gradient-to-br ${badge.bgColor} border ${badge.borderColor}
            group-hover:scale-110 transition-transform duration-300
          `}>
            <badge.icon className={`w-5 h-5 ${badge.color}`} />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">{badge.title}</p>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function PaymentBadges({ className = "" }: { className?: string }) {
  const payments = [
    { name: "PayPal", color: "bg-blue-600" },
    { name: "Visa", color: "bg-blue-700" },
    { name: "Mastercard", color: "bg-red-600" },
    { name: "CB", color: "bg-green-600" },
  ]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Lock className="w-4 h-4 text-green-400" />
      <span className="text-sm text-muted-foreground">Paiement sécurisé:</span>
      <div className="flex gap-2">
        {payments.map((payment) => (
          <div
            key={payment.name}
            className={`
              px-2 py-1 rounded text-xs font-bold text-white
              ${payment.color} hover:opacity-80 transition-opacity cursor-default
            `}
          >
            {payment.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReviewStars({ rating = 4.9, count = 2847, className = "" }: { rating?: number; count?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= Math.floor(rating) ? "text-yellow-400" : "text-muted"}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="font-bold text-foreground">{rating}</span>
      <span className="text-muted-foreground text-sm">({count.toLocaleString()} avis)</span>
    </div>
  )
}

export function SecurityBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 ${className}`}>
      <CheckCircle className="w-4 h-4 text-green-400" />
      <span className="text-sm font-medium text-green-400">Site 100% Sécurisé</span>
    </div>
  )
}
