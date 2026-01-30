"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderStore } from "@/lib/order-store";
import { useCartStore } from "@/lib/cart-store";
import { CheckCircle2, Package, Mail, ArrowRight, Sparkles } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const sessionId = searchParams.get("session_id");
  const { getOrderByNumber } = useOrderStore();
  const { clearCart } = useCartStore();
  const [order, setOrder] = useState(getOrderByNumber(orderNumber || ""));

  useEffect(() => {
    // Clear cart on success
    clearCart();
    
    if (orderNumber) {
      setOrder(getOrderByNumber(orderNumber));
    }
  }, [orderNumber, getOrderByNumber, clearCart]);

  const displayOrderNumber = orderNumber || sessionId?.slice(-12).toUpperCase() || "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <Card className="border-green-500/30 bg-card/50 backdrop-blur overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Merci pour votre commande !
              </span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Votre paiement a ete confirme avec succes.
            </p>

            {/* Order Info */}
            <div className="bg-muted/30 rounded-xl p-6 mb-8 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Numero de commande</span>
                <span className="font-mono text-xs bg-background/50 px-2 py-1 rounded">
                  {displayOrderNumber}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email de confirmation</p>
                  <p className="text-xs text-muted-foreground">
                    {order?.shippingDetails?.email || "Vous recevrez un email avec les details"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Livraison estimee</p>
                  <p className="text-xs text-muted-foreground">
                    3-5 jours ouvrables en France metropolitaine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Suivi de commande</p>
                  <p className="text-xs text-muted-foreground">
                    Vous recevrez un numero de suivi par email
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/orders">
                  Suivre ma commande
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-purple-500/30 hover:bg-purple-500/10 bg-transparent">
                <Link href="/products">
                  Continuer mes achats
                </Link>
              </Button>
            </div>

            {/* Support */}
            <p className="text-xs text-muted-foreground mt-6">
              Une question ? Contactez-nous sur{" "}
              <a
                href={process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/+33756964995"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                WhatsApp
              </a>
              {" "}ou{" "}
              <a
                href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM || "corely.shop"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:underline"
              >
                Instagram
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">Chargement...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
