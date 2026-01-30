"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface PayPalCheckoutProps {
  amount: number
  onSuccess: (orderId: string) => void
  onError?: (error: unknown) => void
  disabled?: boolean
  onValidate?: () => boolean
}

export function PayPalCheckout({ amount, onSuccess, onError, disabled, onValidate }: PayPalCheckoutProps) {
  const [isLoading, setIsLoading] = useState(true)

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  if (!clientId || clientId === "your_paypal_client_id_here") {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
        ⚠️ PayPal non configuré. Ajoutez NEXT_PUBLIC_PAYPAL_CLIENT_ID dans .env
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency: "EUR",
        intent: "capture",
      }}
    >
      <div className="space-y-3">
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            <span className="ml-2 text-sm text-slate-600">Chargement PayPal...</span>
          </div>
        )}
        
        <div style={{ display: isLoading ? 'none' : 'block' }}>
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay",
              height: 50,
            }}
            disabled={disabled}
            forceReRender={[amount]}
            onInit={() => setIsLoading(false)}
            createOrder={(data, actions) => {
              // Validate form before creating order
              if (onValidate && !onValidate()) {
                return Promise.reject(new Error("Validation failed"))
              }

              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "EUR",
                      value: amount.toFixed(2),
                    },
                    description: "Achat Corely Store",
                  },
                ],
              })
            }}
            onApprove={async (data, actions) => {
              if (actions.order) {
                const order = await actions.order.capture()
                console.log("[PayPal] Payment captured:", order)
                onSuccess(order.id || data.orderID || "")
              }
            }}
            onError={(err) => {
              console.error("[PayPal] Error:", err)
              if (onError) {
                onError(err)
              }
            }}
            onCancel={() => {
              console.log("[PayPal] Payment cancelled by user")
            }}
          />
        </div>

        <p className="text-xs text-center text-slate-500">
          Paiement sécurisé par PayPal. Vous serez redirigé pour finaliser votre achat.
        </p>
      </div>
    </PayPalScriptProvider>
  )
}

// Keep old export for backward compatibility
export { PayPalCheckout as PayPalButtons }
