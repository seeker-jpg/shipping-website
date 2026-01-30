"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProductById, caseColors, iphoneModels } from "@/lib/db"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart, Check, Truck, Shield, ArrowLeft, Zap, Package, Star, Smartphone } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const router = useRouter()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedModel)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedModel)
    }
    router.push("/checkout")
  }

  const savings = product.originalPrice ? product.originalPrice - product.price : 0
  const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0

  // Check if product needs color or model selection
  const needsColorSelection = product.colors && product.colors.length > 1
  const needsModelSelection = product.models && product.models.length > 0
  const canPurchase = (!needsColorSelection || selectedColor) && (!needsModelSelection || selectedModel)

  return (
    <div className="min-h-screen circuit-bg">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Button 
            variant="ghost" 
            asChild 
            className="text-foreground hover:text-cyan-400 hover:bg-purple-500/10"
          >
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Produits
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="card-geek p-8 lg:p-12 rounded-2xl">
            <div className="aspect-square relative">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
            </div>
            {/* Color preview dots */}
            {needsColorSelection && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {caseColors.slice(0, 14).map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name 
                        ? "border-cyan-400 scale-110 ring-2 ring-cyan-400/50" 
                        : "border-gray-600 hover:border-purple-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold">{product.category}</Badge>
              {product.stock < 50 && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold animate-pulse">
                  Plus que {product.stock} en stock!
                </Badge>
              )}
              {savingsPercent > 0 && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                  -{savingsPercent}%
                </Badge>
              )}
            </div>

            <h1 className="text-3xl lg:text-5xl font-black mb-6 text-balance">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {product.name}
              </span>
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-muted-foreground">(3241 avis)</span>
            </div>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{product.description}</p>

            <div className="card-geek rounded-xl p-6 mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {product.price.toFixed(2)}€
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">{product.originalPrice.toFixed(2)}€</span>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg px-3 py-1">
                      Economisez {savings.toFixed(2)}€
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-green-400 font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Livraison GRATUITE incluse
              </p>
            </div>

            {/* Model Selector */}
            {needsModelSelection && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-purple-400 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Modele iPhone *
                </label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-full bg-background/50 border-purple-500/30 text-foreground">
                    <SelectValue placeholder="Selectionnez votre modele iPhone" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-purple-500/30 max-h-[300px]">
                    {(product.models || iphoneModels).map((model) => (
                      <SelectItem key={model} value={model} className="text-foreground hover:bg-purple-500/20">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Color Selector */}
            {needsColorSelection && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-purple-400">
                  Couleur * {selectedColor && <span className="text-cyan-400">- {selectedColor}</span>}
                </label>
                <div className="flex flex-wrap gap-3">
                  {caseColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name 
                          ? "border-cyan-400 scale-110 ring-2 ring-cyan-400/50" 
                          : "border-gray-600 hover:border-purple-400 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-purple-400">Quantite</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-purple-500/30 rounded-xl overflow-hidden bg-background/50">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="text-foreground hover:bg-purple-500/20 hover:text-purple-400"
                  >
                    -
                  </Button>
                  <span className="px-8 py-3 font-bold text-xl text-foreground">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="text-foreground hover:bg-purple-500/20 hover:text-purple-400"
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stock} disponibles</span>
              </div>
            </div>

            {/* Missing selection warning */}
            {!canPurchase && (
              <div className="mb-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                <p className="text-orange-400 text-sm font-medium">
                  Veuillez selectionner {!selectedModel && needsModelSelection ? "un modele iPhone" : ""} 
                  {!selectedModel && needsModelSelection && !selectedColor && needsColorSelection ? " et " : ""}
                  {!selectedColor && needsColorSelection ? "une couleur" : ""} pour continuer.
                </p>
              </div>
            )}

            <div className="space-y-3 mb-8">
              <Button 
                size="lg" 
                className="w-full btn-cyber bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white text-lg py-6 font-bold rounded-xl shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleBuyNow}
                disabled={!canPurchase}
              >
                <Zap className="w-5 h-5 mr-2" />
                Commander Maintenant
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 text-foreground py-6 font-bold rounded-xl bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={addedToCart || !canPurchase}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2 text-green-400" />
                    Ajoute au Panier
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Ajouter au Panier
                  </>
                )}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Livraison Gratuite", color: "cyan" },
                { icon: Shield, label: "Paiement Securise", color: "green" },
                { icon: Package, label: "Qualite Garantie", color: "purple" },
              ].map((item) => (
                <div key={item.label} className="text-center card-geek p-4 rounded-xl">
                  <div className={`w-12 h-12 rounded-full bg-${item.color}-500/20 flex items-center justify-center mx-auto mb-2`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <Card className="card-geek border-purple-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-black mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Caracteristiques
                </span>
              </h2>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="card-geek border-purple-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-black mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Specifications
                </span>
              </h2>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between py-3">
                      <span className="font-semibold capitalize text-purple-400">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-muted-foreground text-right">{value}</span>
                    </div>
                    <Separator className="bg-purple-500/20" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
