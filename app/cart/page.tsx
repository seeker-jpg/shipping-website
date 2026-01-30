"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Shield, Zap, HardDrive } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  const subtotal = getTotal()
  const shipping = 0 // Always free shipping
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen circuit-bg flex items-center justify-center">
        <div className="text-center py-12">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Votre panier est vide
            </span>
          </h1>
          <p className="text-muted-foreground mb-8">Ajoutez des produits pour commencer</p>
          <Button 
            size="lg" 
            asChild 
            className="btn-cyber bg-gradient-to-r from-purple-600 to-cyan-600 font-bold"
          >
            <Link href="/products">
              <HardDrive className="w-5 h-5 mr-2" />
              Voir les Produits
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen circuit-bg">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Votre Panier
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">Verifiez vos articles et passez commande</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-foreground">Articles ({items.length})</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                Tout supprimer
              </Button>
            </div>

            {items.map((item) => (
              <Card key={item.product.id} className="card-geek border-purple-500/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 relative bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl flex-shrink-0 border border-purple-500/20">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 md:gap-4 mb-2">
                        <div>
                          <Link
                            href={`/products/${item.product.id}`}
                            className="hover:text-purple-400 transition-colors"
                          >
                            <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1">{item.product.name}</h3>
                          </Link>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {item.product.brand} - {item.product.capacity}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mt-3 md:mt-4">
                        <div className="flex items-center border border-purple-500/30 rounded-lg bg-background/50 overflow-hidden">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="text-foreground hover:bg-purple-500/20"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 font-bold text-foreground">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="text-foreground hover:bg-purple-500/20"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {(item.product.price * item.quantity).toFixed(2)}EUR
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">{item.product.price.toFixed(2)}EUR / unite</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="card-geek border-purple-500/20 sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-black mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Recapitulatif
                  </span>
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-bold text-foreground">{subtotal.toFixed(2)}EUR</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-bold text-green-400 flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      GRATUITE
                    </span>
                  </div>

                  <Separator className="bg-purple-500/20" />

                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {total.toFixed(2)}EUR
                    </span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full btn-cyber bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 font-bold py-6 rounded-xl shadow-lg shadow-purple-500/30" 
                  asChild
                >
                  <Link href="/checkout">
                    <Zap className="w-5 h-5 mr-2" />
                    Passer Commande
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full mt-3 border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 font-bold rounded-xl bg-transparent" 
                  asChild
                >
                  <Link href="/products">Continuer mes achats</Link>
                </Button>

                {/* Trust indicators */}
                <div className="mt-6 pt-6 border-t border-purple-500/20">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>Paiement securise</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="w-4 h-4 text-cyan-400" />
                      <span>Livraison gratuite</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-purple-500/20 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Nous acceptons</p>
                  <div className="flex justify-center items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-lg font-bold text-sm text-blue-400">
                      PayPal
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 px-4 py-2 rounded-lg font-bold text-sm text-purple-400">
                      CB
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
