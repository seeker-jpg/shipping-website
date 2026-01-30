import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/db"
import { ShoppingCart, Zap, Star, Truck, Shield } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group card-geek overflow-hidden rounded-xl md:rounded-2xl">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 p-3 md:p-6 overflow-hidden">
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Circuit pattern overlay */}
          <div className="absolute inset-0 circuit-bg opacity-30" />
          
          {/* Product image with hover effect */}
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
            <img 
              src={product.image || "/placeholder.svg"} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain drop-shadow-2xl" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          {/* Discount badge with glow */}
          {product.originalPrice && (
            <Badge className="absolute top-2 right-2 md:top-4 md:right-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black text-xs md:text-lg px-2 py-1 md:px-4 md:py-2 shadow-lg shadow-red-500/30">
              -{discount}%
            </Badge>
          )}
          
          {/* Promo badge */}
          <Badge className="absolute top-2 left-2 md:top-4 md:left-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs md:text-sm px-2 py-1 shadow-lg shadow-purple-500/30">
            <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
            PROMO
          </Badge>
          
          {/* Quick info on hover - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3" /> Gratuit
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Garanti
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 4.9
              </span>
            </div>
          </div>
        </div>
      </Link>

      <CardContent className="p-3 md:p-6 relative">
        {/* Subtle glow line at top */}
        <div className="absolute top-0 left-3 right-3 md:left-6 md:right-6 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        
        {/* Badges - Simplified on mobile */}
        <div className="mb-2 md:mb-3 flex gap-1.5 md:gap-2 flex-wrap">
          <Badge variant="outline" className="font-bold border-purple-500/50 text-purple-400 text-xs px-1.5 py-0.5 md:px-2 md:py-1">
            {product.category}
          </Badge>
          {product.color && (
            <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs px-1.5 py-0.5 md:px-2 md:py-1 hidden sm:inline-flex">
              {product.color}
            </Badge>
          )}
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-black text-sm md:text-xl mb-1.5 md:mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description hidden on mobile */}
        <p className="hidden md:block text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-baseline gap-1.5 md:gap-3 mb-1 md:mb-2">
          <span className="text-xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {product.price.toFixed(2)}€
          </span>
          {product.originalPrice && (
            <span className="text-xs md:text-lg text-muted-foreground line-through font-semibold">
              {product.originalPrice.toFixed(2)}€
            </span>
          )}
        </div>
        
        {/* Mobile: Compact shipping info */}
        <div className="flex items-center gap-1.5 text-[10px] md:text-xs">
          <Truck className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-400" />
          <span className="font-bold text-green-400">Livraison GRATUITE</span>
        </div>
      </CardContent>

      <CardFooter className="p-3 md:p-6 pt-0">
        <Button
          className="w-full btn-cyber bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 font-bold text-xs md:text-lg py-3 md:py-6 rounded-lg md:rounded-xl text-white shadow-lg shadow-purple-500/25"
          asChild
        >
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">COMMANDER</span>
            <span className="sm:hidden">ACHETER</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
