import Link from "next/link"
import { Mail, Shield, Truck, RotateCcw, Headphones, Instagram } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  const currentYear = new Date().getFullYear()

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
              Coques iPhone, cables USB-C et chargeurs rapides a prix imbattables avec livraison gratuite.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/corely.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-muted-foreground hover:text-purple-400 hover:border-purple-400 hover:bg-purple-500/20 transition-all duration-300 hover-lift-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@corely.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-muted-foreground hover:text-pink-400 hover:border-pink-400 hover:bg-pink-500/20 transition-all duration-300 hover-lift-sm"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
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
                href="mailto:contact@corely.fr" 
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
