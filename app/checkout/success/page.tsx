"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useOrderStore } from "@/lib/order-store"
import { CheckCircle2, Package, Mail, ArrowRight } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")
  const { getOrderByNumber } = useOrderStore()
  const [order, setOrder] = useState(getOrderByNumber(orderNumber || ""))

  useEffect(() => {
    if (orderNumber) {
      setOrder(getOrderByNumber(orderNumber))
    }
  }, [orderNumber, getOrderByNumber])

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-12 text-center">
            <p className="text-slate-600 mb-4">Order not found</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>

              <p className="text-lg text-slate-600 mb-8">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>

              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                <p className="text-sm text-slate-600 mb-2">Order Number</p>
                <p className="text-2xl font-bold text-orange-600">{order.orderNumber}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Confirmation Email</h3>
                    <p className="text-sm text-slate-600">
                      A confirmation email has been sent to {order.shippingDetails.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Shipping Address</h3>
                    <p className="text-sm text-slate-600">
                      {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.state}{" "}
                      {order.shippingDetails.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/orders?order=${order.orderNumber}`}>
                    Track Your Order
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Need help?{" "}
              <Link href="/contact" className="text-orange-600 hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
