import { type NextRequest, NextResponse } from "next/server"

interface OrderData {
  orderNumber: string
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  shipping: number
  total: number
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json()

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
    const TELEGRAM_THREAD_ID = process.env.TELEGRAM_THREAD_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("[v0] Telegram credentials not configured")
      return NextResponse.json({ success: false, error: "Telegram not configured" }, { status: 500 })
    }

    // Format the message
    const formattedMessage = `
🛒 *NOUVELLE COMMANDE*

📦 *Numéro de commande:* ${orderData.orderNumber}

👤 *INFORMATIONS CLIENT*
Nom: ${orderData.customerName}
Email: ${orderData.email}
Téléphone: ${orderData.phone}

📍 *ADRESSE DE LIVRAISON*
${orderData.address}
${orderData.city}, ${orderData.state} ${orderData.zipCode}
${orderData.country}

🛍️ *PRODUITS COMMANDÉS*
${orderData.items.map((item) => `• ${item.name} (x${item.quantity}) - ${item.price.toFixed(2)}€`).join("\n")}

💰 *RÉSUMÉ FINANCIER*
Sous-total: ${orderData.subtotal.toFixed(2)}€
Livraison: ${orderData.shipping === 0 ? "GRATUITE" : `${orderData.shipping.toFixed(2)}€`}
*TOTAL: ${orderData.total.toFixed(2)}€*

✅ Paiement confirmé via PayPal
`

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const payload: any = {
      chat_id: TELEGRAM_CHAT_ID,
      text: formattedMessage,
      parse_mode: "Markdown",
    }

    // Add thread ID if provided
    if (TELEGRAM_THREAD_ID) {
      payload.message_thread_id = TELEGRAM_THREAD_ID
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Telegram API error:", error)
      return NextResponse.json({ success: false, error: "Failed to send to Telegram" }, { status: 500 })
    }

    console.log("[v0] Order successfully sent to Telegram")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in send-order API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
