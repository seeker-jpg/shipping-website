"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { useOrderStore } from "@/lib/order-store"
import type { ShippingDetails } from "@/lib/db"
import { ShoppingBag, CreditCard, Truck, Lock, Zap, HardDrive, Shield, Loader2 } from "lucide-react"
import { PayPalButtons } from "@/components/paypal-buttons"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const { addOrder } = useOrderStore()

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "France",
  })

  const [errors, setErrors] = useState<Partial<ShippingDetails>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "stripe">("paypal")

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
          <p className="text-muted-foreground mb-8">Ajoutez des produits avant de passer commande</p>
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

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingDetails> = {}

    if (!shippingDetails.firstName.trim()) newErrors.firstName = "Le prenom est requis"
    if (!shippingDetails.lastName.trim()) newErrors.lastName = "Le nom est requis"
    if (!shippingDetails.email.trim()) newErrors.email = "L'email est requis"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingDetails.email)) newErrors.email = "Email invalide"
    if (!shippingDetails.phone.trim()) newErrors.phone = "Le numero de telephone est requis"
    if (!shippingDetails.address.trim()) newErrors.address = "L'adresse est requise"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleStripeCheckout = async () => {
    if (!validateForm()) {
      alert("Veuillez remplir tous les champs obligatoires correctement")
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.product.name,
            price: item.product.salePrice || item.product.price,
            quantity: item.quantity,
            selectedColor: item.selectedColor,
            selectedModel: item.selectedModel,
          })),
          customer: {
            firstName: shippingDetails.firstName,
            lastName: shippingDetails.lastName,
            email: shippingDetails.email,
            phone: shippingDetails.phone,
            address: shippingDetails.address,
            postalCode: shippingDetails.zipCode,
            city: shippingDetails.city,
            country: shippingDetails.country,
          },
          shippingCost: shipping,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Erreur de paiement")
      }
    } catch (error) {
      console.error("Stripe checkout error:", error)
      alert("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = async () => {
    if (!validateForm()) {
      alert("Veuillez remplir tous les champs obligatoires correctement")
      return
    }

    setIsProcessing(true)

    const orderNumber = `SD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    const order = {
      id: orderNumber,
      orderNumber,
      items: [...items],
      shippingDetails: { ...shippingDetails },
      subtotal,
      shipping,
      total,
      status: "processing" as const,
      paymentStatus: "completed" as const,
      paymentMethod: "PayPal",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      const orderData = {
        orderNumber,
        customerName: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
        email: shippingDetails.email,
        phone: shippingDetails.phone,
        address: `${shippingDetails.address}${shippingDetails.city ? ", " + shippingDetails.city : ""}${shippingDetails.zipCode ? " " + shippingDetails.zipCode : ""}`,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price * item.quantity,
        })),
        subtotal,
        shipping,
        total,
        paymentMethod: "paypal",
      }

      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        console.error("Failed to send Telegram notification")
      }
    } catch (error) {
      console.error("Error sending to Telegram:", error)
    }

    addOrder(order)
    clearCart()
    router.push(`/checkout/success?order=${orderNumber}`)
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
              Finaliser la Commande
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">Completez vos informations pour recevoir votre carte SD</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-geek border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                  <Truck className="w-6 h-6 text-cyan-400" />
                  Informations de Livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-purple-400">
                      Prenom <span className="text-pink-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={shippingDetails.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`bg-background/50 border-purple-500/30 focus:border-purple-400 ${errors.firstName ? "border-red-500" : ""}`}
                      placeholder="Jean"
                    />
                    {errors.firstName && <p className="text-sm text-red-400 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-purple-400">
                      Nom <span className="text-pink-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={shippingDetails.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`bg-background/50 border-purple-500/30 focus:border-purple-400 ${errors.lastName ? "border-red-500" : ""}`}
                      placeholder="Dupont"
                    />
                    {errors.lastName && <p className="text-sm text-red-400 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-purple-400">
                      Email <span className="text-pink-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingDetails.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`bg-background/50 border-purple-500/30 focus:border-purple-400 ${errors.email ? "border-red-500" : ""}`}
                      placeholder="jean.dupont@email.com"
                    />
                    {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-purple-400">
                      Numero Portable <span className="text-pink-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`bg-background/50 border-purple-500/30 focus:border-purple-400 ${errors.phone ? "border-red-500" : ""}`}
                      placeholder="+33 6 12 34 56 78"
                    />
                    {errors.phone && <p className="text-sm text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-purple-400">
                    Adresse Complete <span className="text-pink-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={shippingDetails.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`bg-background/50 border-purple-500/30 focus:border-purple-400 ${errors.address ? "border-red-500" : ""}`}
                    placeholder="123 Rue de la Republique, 75001 Paris"
                  />
                  {errors.address && <p className="text-sm text-red-400 mt-1">{errors.address}</p>}
                  <p className="text-xs text-muted-foreground mt-1">Adresse complete avec code postal et ville</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="card-geek border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  Methode de Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Payment Method Selection */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* PayPal Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-purple-500/20 hover:border-purple-500/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "paypal" ? "border-blue-500" : "border-muted-foreground"
                      }`}>
                        {paymentMethod === "paypal" && (
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-white text-sm">PP</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">PayPal</p>
                        <p className="text-xs text-muted-foreground">Paiement securise</p>
                      </div>
                    </div>
                  </button>

                  {/* Stripe/Card Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("stripe")}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "stripe"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-purple-500/20 hover:border-purple-500/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "stripe" ? "border-purple-500" : "border-muted-foreground"
                      }`}>
                        {paymentMethod === "stripe" && (
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                        )}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Carte Bancaire</p>
                        <p className="text-xs text-muted-foreground">Visa, Mastercard, AMEX</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* PayPal Payment */}
                {paymentMethod === "paypal" && (
                  <div className="space-y-4">
                    <PayPalButtons
                      amount={total}
                      onSuccess={handlePaymentSuccess}
                      disabled={isProcessing}
                      onValidate={validateForm}
                    />
                  </div>
                )}

                {/* Stripe Payment */}
                {paymentMethod === "stripe" && (
                  <div className="space-y-4">
                    <Button
                      onClick={handleStripeCheckout}
                      disabled={isProcessing}
                      className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Redirection...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Payer {total.toFixed(2)} EUR par carte
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Vous serez redirige vers une page de paiement securisee Stripe
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Paiement 100% securise et chiffre</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="card-geek border-purple-500/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Recapitulatif
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-3 rounded-xl bg-background/50 border border-purple-500/20">
                      <div className="w-16 h-16 relative bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg flex-shrink-0 border border-purple-500/20">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1 text-foreground">{item.product.name}</p>
                        <p className="text-xs text-purple-400">Qte: {item.quantity}</p>
                        <p className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          {(item.product.price * item.quantity).toFixed(2)}EUR
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-purple-500/20" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-bold text-foreground">{subtotal.toFixed(2)}EUR</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-bold text-green-400 flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      GRATUITE
                    </span>
                  </div>
                </div>

                <Separator className="bg-purple-500/20" />

                <div className="flex justify-between text-xl">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {total.toFixed(2)}EUR
                  </span>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-4 mt-4">
                  <p className="text-xs text-center text-muted-foreground">
                    Offre limitee : Economisez jusqu'a 75% sur toutes les cartes SD!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
