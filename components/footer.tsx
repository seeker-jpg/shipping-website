import Link from "next/link"
import { Mail, Shield, Truck, RotateCcw, Headphones, Instagram, MessageCircle, Send } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Social media links from environment variables
  const instagramUsername = process.env.NEXT_PUBLIC_INSTAGRAM || "corely.shop"
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/+33756964995"
  const telegramLink = process.env.NEXT_PUBLIC_TELEGRAM || "https://t.me/+33756964995"

  return (
    <footer className="relative border-t border-purple-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/80" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="mb-6" />
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Votre boutique d'accessoires mobiles premium. 
              Coques iPhone, câbles USB C et chargeurs rapides haute performance à prix imbattables, avec livraison gratuite.
            </p>
            
            {/* Social Links - Instagram, WhatsApp, Telegram */}
            <div className="flex gap-3">
              <a
                href={`https://instagram.com/${instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Boutique</h4>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "Tous les Produits" },
                { href: "/products?category=Coques", label: "Coques iPhone" },
                { href: "/products?category=Cables", label: "Cables USB-C" },
                { href: "/products?category=Chargeurs", label: "Chargeurs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors link-underline text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Support</h4>
            <ul className="space-y-3">
              {[
                { href: "/orders", label: "Suivre ma Commande" },
                { href: "/shipping", label: "Infos Livraison" },
                { href: "/returns", label: "Retours & Remboursements" },
                { href: "/contact", label: "Nous Contacter" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors link-underline text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {[
                { href: "/privacy", label: "Confidentialite" },
                { href: "/terms", label: "Conditions Generales" },
                { href: "/warranty", label: "Garantie" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors link-underline text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a 
                href="mailto:corely.shop@outlook.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                corely.shop@outlook.com
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              { icon: Shield, label: "Paiement Securise" },
              { icon: Truck, label: "Livraison Gratuite" },
              { icon: RotateCcw, label: "Retours 30j" },
              { icon: Headphones, label: "Support 24/7" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <badge.icon className="w-4 h-4 text-purple-400" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["PayPal", "Visa", "Mastercard", "CB"].map((method) => (
              <div
                key={method}
                className="px-3 py-1.5 rounded bg-card border border-border text-xs font-medium text-muted-foreground"
              >
                {method}
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Corely.fr - Tous droits reserves.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
