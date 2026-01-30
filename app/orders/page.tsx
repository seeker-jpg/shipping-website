"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useOrderStore } from "@/lib/order-store"
import type { Order } from "@/lib/db"
import { Package, Search, Truck, CheckCircle2, XCircle, Clock } from "lucide-react"

function OrdersContent() {
  const searchParams = useSearchParams()
  const orderParam = searchParams.get("order")

  const { getAllOrders, getOrderByNumber } = useOrderStore()
  const [searchQuery, setSearchQuery] = useState(orderParam || "")
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>()
  const [showAllOrders, setShowAllOrders] = useState(!orderParam)

  useEffect(() => {
    if (orderParam) {
      const order = getOrderByNumber(orderParam)
      setSelectedOrder(order)
      setShowAllOrders(false)
    }
  }, [orderParam, getOrderByNumber])

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    const order = getOrderByNumber(searchQuery.trim())
    setSelectedOrder(order)
    setShowAllOrders(false)
  }

  const handleShowAllOrders = () => {
    setShowAllOrders(true)
    setSelectedOrder(undefined)
    setSearchQuery("")
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "processing":
        return <Clock className="w-5 h-5 text-orange-600" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-slate-600" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-orange-100 text-orange-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const allOrders = getAllOrders()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-slate-300">Enter your order number to view order details and shipping status</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="orderNumber" className="mb-2 block">
                  Order Number
                </Label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., ORD-1234567890-ABC123"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex gap-2 md:self-end">
                <Button onClick={handleSearch} className="flex-1 md:flex-none">
                  <Search className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
                {allOrders.length > 0 && !showAllOrders && (
                  <Button
                    variant="outline"
                    onClick={handleShowAllOrders}
                    className="flex-1 md:flex-none bg-transparent"
                  >
                    View All
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {!showAllOrders && selectedOrder && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2">Order Details</CardTitle>
                    <p className="text-slate-600">Order #{selectedOrder.orderNumber}</p>
                  </div>
                  <Badge className={`${getStatusColor(selectedOrder.status)} w-fit`}>
                    <span className="capitalize">{selectedOrder.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Status Timeline */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Order Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium">Order Placed</p>
                        <p className="text-sm text-slate-600">
                          {new Date(selectedOrder.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedOrder.status === "processing" ||
                      selectedOrder.status === "shipped" ||
                      selectedOrder.status === "delivered" ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-slate-400" />
                      )}
                      <div>
                        <p className="font-medium">Processing</p>
                        <p className="text-sm text-slate-600">
                          {selectedOrder.status === "processing"
                            ? "Currently being prepared"
                            : selectedOrder.status === "shipped" || selectedOrder.status === "delivered"
                              ? "Completed"
                              : "Pending"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedOrder.status === "shipped" || selectedOrder.status === "delivered" ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Truck className="w-6 h-6 text-slate-400" />
                      )}
                      <div>
                        <p className="font-medium">Shipped</p>
                        <p className="text-sm text-slate-600">
                          {selectedOrder.status === "shipped" || selectedOrder.status === "delivered"
                            ? "Out for delivery"
                            : "Not shipped yet"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedOrder.status === "delivered" ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Package className="w-6 h-6 text-slate-400" />
                      )}
                      <div>
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-slate-600">
                          {selectedOrder.status === "delivered" ? "Package delivered" : "Estimated 3-5 business days"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 bg-slate-50 rounded-lg p-4">
                        <div className="w-20 h-20 relative bg-white rounded flex-shrink-0">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.product.name}</h4>
                          <p className="text-sm text-slate-600">
                            {item.product.brand} - {item.product.capacity}
                          </p>
                          <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                          <p className="font-semibold mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Shipping & Payment Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Shipping Address</h3>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>
                        {selectedOrder.shippingDetails.firstName} {selectedOrder.shippingDetails.lastName}
                      </p>
                      <p>{selectedOrder.shippingDetails.address}</p>
                      <p>
                        {selectedOrder.shippingDetails.city}, {selectedOrder.shippingDetails.state}{" "}
                        {selectedOrder.shippingDetails.zipCode}
                      </p>
                      <p>{selectedOrder.shippingDetails.country}</p>
                      <p className="mt-2">Email: {selectedOrder.shippingDetails.email}</p>
                      <p>Phone: {selectedOrder.shippingDetails.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-medium">${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Shipping</span>
                        <span className="font-medium">
                          {selectedOrder.shipping === 0 ? "FREE" : `$${selectedOrder.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mt-4">
                        <span className="text-slate-600">Payment Method</span>
                        <span className="font-medium">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Payment Status</span>
                        <Badge
                          className={
                            selectedOrder.paymentStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {selectedOrder.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" onClick={handleShowAllOrders} className="flex-1 bg-transparent">
                View All Orders
              </Button>
            </div>
          </div>
        )}

        {/* All Orders View */}
        {showAllOrders && (
          <div>
            {allOrders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
                  <p className="text-slate-600 mb-8">You haven't placed any orders yet</p>
                  <Button size="lg" asChild>
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Your Orders ({allOrders.length})</h2>
                {allOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Order placed on</p>
                          <p className="font-semibold">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-slate-600 mb-1">Total</p>
                            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} whitespace-nowrap`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="text-sm text-slate-600 mb-1">Order Number</p>
                          <p className="font-mono font-semibold">{order.orderNumber}</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowAllOrders(false)
                            setSearchQuery(order.orderNumber)
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Order Not Found */}
        {!showAllOrders && !selectedOrder && searchQuery && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
              <p className="text-slate-600 mb-8">
                We couldn't find an order with number: <span className="font-mono font-semibold">{searchQuery}</span>
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => setSearchQuery("")} className="bg-transparent">
                  Try Again
                </Button>
                {allOrders.length > 0 && <Button onClick={handleShowAllOrders}>View All Orders</Button>}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  )
}
