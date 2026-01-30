"use client"

import { useState, useEffect } from "react"
import { loadStripe, Stripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2, CreditCard, Lock, AlertCircle } from "lucide-react"

// Get Stripe key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// Initialize Stripe only if key exists
let stripePromise: Promise<Stripe | null> | null = null

function getStripePromise() {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey)
  }
  return stripePromise
}

interface StripeCheckoutProps {
  amount: number
  onSuccess: (paymentIntentId: string) => void
  onError?: (error: string) => void
  disabled?: boolean
  onValidate?: () => boolean
  customerEmail?: string
}

function CheckoutForm({ 
  onSuccess, 
  onError, 
  disabled,
  onValidate 
}: Omit<StripeCheckoutProps, 'amount' | 'customerEmail'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (onValidate && !onValidate()) {
      return
    }

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    })

    if (error) {
      setErrorMessage(error.message || "Une erreur est survenue")
      onError?.(error.message || "Erreur de paiement")
      setIsProcessing(false)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent.id)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-600">
        <PaymentElement 
          options={{
            layout: "tabs",
          }}
        />
      </div>
      
      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full neon-button-primary text-lg py-6"
        disabled={!stripe || isProcessing || disabled}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Paiement en cours...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payer maintenant
          </span>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
        <Lock className="w-4 h-4" />
        <span>Paiement 100% sécurisé par Stripe</span>
      </div>
    </form>
  )
}

export function StripeCheckout({ 
  amount, 
  onSuccess, 
  onError, 
  disabled,
  onValidate,
  customerEmail
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if Stripe is configured
  const isStripeConfigured = !!stripePublishableKey && !stripePublishableKey.includes("XXXXXX")

  useEffect(() => {
    if (!isStripeConfigured) {
      setLoading(false)
      setError("Stripe n'est pas configuré. Veuillez ajouter vos clés API dans le fichier .env")
      return
    }

    // Create PaymentIntent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            amount, 
            orderId: `ORD-${Date.now()}`,
            customerEmail 
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to create payment intent")
        }

        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error("Error creating payment intent:", err)
        const message = err instanceof Error ? err.message : "Erreur lors de l'initialisation du paiement"
        setError(message)
        onError?.(message)
      } finally {
        setLoading(false)
      }
    }

    if (amount > 0) {
      createPaymentIntent()
    }
  }, [amount, customerEmail, onError, isStripeConfigured])

  if (!isStripeConfigured) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-yellow-400 font-semibold">Configuration Stripe requise</p>
            <p className="text-yellow-400/80 text-sm mt-1">
              Ajoutez vos clés Stripe dans le fichier .env puis relancez le serveur.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <p className="text-slate-400">Chargement du paiement sécurisé...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-semibold">Erreur de paiement</p>
            <p className="text-red-400/80 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-yellow-400">Impossible d'initialiser le paiement</p>
      </div>
    )
  }

  const stripeInstance = getStripePromise()

  return (
    <Elements
      stripe={stripeInstance}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#22d3ee",
            colorBackground: "#0f172a",
            colorText: "#e2e8f0",
            colorDanger: "#ef4444",
            fontFamily: "system-ui, sans-serif",
            borderRadius: "8px",
          },
        },
      }}
    >
      <CheckoutForm 
        onSuccess={onSuccess} 
        onError={onError}
        disabled={disabled}
        onValidate={onValidate}
      />
    </Elements>
  )
}
