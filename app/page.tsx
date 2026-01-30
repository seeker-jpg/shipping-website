import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/lib/db"
import { ShoppingCart, Shield, Truck, Headphones, Zap, Sparkles, Star, ArrowRight, Smartphone, Cable, BatteryCharging } from "lucide-react"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen circuit-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl float" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 px-6 py-3 rounded-full mb-8 hover-lift-sm">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-bold text-foreground">OFFRE FLASH - STOCK LIMITE</span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="text-foreground">ACCESSOIRES </span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                MOBILES
              </span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl text-foreground">QUALITE PREMIUM A PRIX MINI</span>
            </h1>

            <div className="inline-flex items-baseline gap-4 mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
              <span className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                4,99€
              </span>
              <div className="text-left">
                <p className="text-xl text-muted-foreground line-through">19,99€</p>
                <p className="text-green-400 font-bold flex items-center gap-1">
                  <Zap className="w-4 h-4" /> -75% de reduction
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Coques iPhone, cables USB-C, chargeurs rapides.
              <span className="text-green-400 font-bold"> Livraison gratuite</span> incluse.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="btn-cyber bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white text-lg px-10 py-7 h-auto font-bold shadow-2xl shadow-purple-500/30 rounded-xl"
                asChild
              >
                <Link href="/products">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  VOIR LA BOUTIQUE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">Paiement Securise</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full">
                <Truck className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">Livraison Gratuite</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-2 text-foreground font-semibold">4.9/5 (3241 avis)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: "Coques iPhone", desc: "Protection elegante", href: "/products?category=Coques", color: "cyan" },
              { icon: Cable, title: "Cables USB-C", desc: "Charge ultra rapide", href: "/products?category=Cables", color: "purple" },
              { icon: BatteryCharging, title: "Chargeurs", desc: "40W double port", href: "/products?category=Chargeurs", color: "pink" },
            ].map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="card-geek p-8 rounded-xl text-center hover-lift cursor-pointer">
                  <div className={`w-20 h-20 rounded-full bg-${item.color}-500/20 flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-10 h-10 text-${item.color}-400`} />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Livraison Gratuite", desc: "Incluse", color: "cyan" },
              { icon: Shield, title: "Paiement Securise", desc: "PayPal & CB", color: "green" },
              { icon: Zap, title: "Expedition 24h", desc: "Envoi rapide", color: "yellow" },
              { icon: Headphones, title: "Support 24/7", desc: "Assistance", color: "purple" },
            ].map((item) => (
              <div key={item.title} className="card-geek p-4 rounded-xl text-center">
                <item.icon className={`w-8 h-8 text-${item.color}-400 mx-auto mb-2`} />
                <h3 className="font-bold text-sm mb-1 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-4 py-2 rounded-full font-bold text-sm text-purple-400 mb-6">
              <Zap className="w-4 h-4" />
              BEST-SELLERS
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-foreground">Nos </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Meilleures Ventes
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Coques, cables et chargeurs. Tout a 4,99€ livraison incluse.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="btn-cyber bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-lg px-10 py-6 h-auto font-bold rounded-xl shadow-lg shadow-cyan-500/25" 
              asChild
            >
              <Link href="/products">
                VOIR TOUS LES PRODUITS
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-purple-900/30 via-background to-cyan-900/30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-foreground">Pourquoi </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Corely ?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-16">
              Vu sur TikTok et Instagram !
            </p>
            
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[
                { value: "25K+", label: "Clients Satisfaits", icon: Star },
                { value: "4.9", label: "Note Moyenne", icon: Star },
                { value: "100%", label: "Qualite Garantie", icon: Shield },
              ].map((stat) => (
                <div 
                  key={stat.label}
                  className="card-geek p-4 md:p-8 rounded-xl md:rounded-2xl text-center hover-lift"
                >
                  <stat.icon className="w-6 h-6 md:w-10 md:h-10 mx-auto mb-2 md:mb-4 text-purple-400" />
                  <div className="text-2xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-base text-muted-foreground font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-sm md:text-2xl font-black text-white flex items-center justify-center gap-2 md:gap-3">
            <Zap className="w-4 h-4 md:w-6 md:h-6 animate-pulse" />
            <span className="hidden sm:inline">STOCK LIMITE - COMMANDEZ MAINTENANT !</span>
            <span className="sm:hidden">OFFRE LIMITEE !</span>
            <Zap className="w-4 h-4 md:w-6 md:h-6 animate-pulse" />
          </p>
        </div>
      </section>
    </div>
  )
}
