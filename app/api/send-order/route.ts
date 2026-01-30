import { type NextRequest, NextResponse } from "next/server";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  selectedColor?: string;
  selectedModel?: string;
}

interface OrderData {
  orderNumber?: string;
  customerName?: string;
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode?: string;
    city?: string;
    country?: string;
  };
  email?: string;
  phone?: string;
  address?: string;
  items: OrderItem[];
  subtotal?: number;
  shipping?: number;
  total: number;
  paymentMethod?: string;
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const TELEGRAM_THREAD_ID = process.env.TELEGRAM_THREAD_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials not configured");
      return NextResponse.json(
        { success: true, message: "Order received (notifications disabled)" }
      );
    }

    // Handle both old and new data formats
    const customerName = orderData.customerName || 
      (orderData.customer ? `${orderData.customer.firstName} ${orderData.customer.lastName}` : "N/A");
    const email = orderData.email || orderData.customer?.email || "N/A";
    const phone = orderData.phone || orderData.customer?.phone || "N/A";
    const address = orderData.address || 
      (orderData.customer ? `${orderData.customer.address}${orderData.customer.postalCode ? `, ${orderData.customer.postalCode}` : ""}${orderData.customer.city ? ` ${orderData.customer.city}` : ""}${orderData.customer.country ? `, ${orderData.customer.country}` : ""}` : "N/A");

    const paymentEmoji = orderData.paymentMethod === "stripe" ? "💳" : "🅿️";
    const paymentName = orderData.paymentMethod === "stripe" ? "Carte Bancaire (Stripe)" : "PayPal";

    // Format items list
    const itemsList = orderData.items
      .map((item) => {
        let line = `   • ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)}EUR`;
        if (item.selectedColor) line += `\n      Couleur: ${item.selectedColor}`;
        if (item.selectedModel) line += `\n      Modele: ${item.selectedModel}`;
        return line;
      })
      .join("\n");

    const formattedMessage = `
🛒 *NOUVELLE COMMANDE CORELY*
━━━━━━━━━━━━━━━━━━━━

${orderData.orderNumber ? `📦 *Numero:* ${orderData.orderNumber}\n` : ""}
👤 *CLIENT*
━━━━━━━━━━━━━━━━━━━━
Nom: ${customerName}
Email: ${email}
Tel: ${phone}

📍 *ADRESSE DE LIVRAISON*
━━━━━━━━━━━━━━━━━━━━
${address}

🛍️ *ARTICLES*
━━━━━━━━━━━━━━━━━━━━
${itemsList}

${paymentEmoji} *PAIEMENT*
━━━━━━━━━━━━━━━━━━━━
Methode: ${paymentName}
${orderData.subtotal !== undefined ? `Sous-total: ${orderData.subtotal.toFixed(2)}EUR\n` : ""}${orderData.shipping !== undefined ? `Livraison: ${orderData.shipping === 0 ? "GRATUITE" : `${orderData.shipping.toFixed(2)}EUR`}\n` : ""}*TOTAL: ${orderData.total.toFixed(2)}EUR*

⏰ ${new Date().toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const payload: Record<string, unknown> = {
      chat_id: TELEGRAM_CHAT_ID,
      text: formattedMessage,
      parse_mode: "Markdown",
    };

    if (TELEGRAM_THREAD_ID) {
      payload.message_thread_id = Number.parseInt(TELEGRAM_THREAD_ID);
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      return NextResponse.json(
        { success: false, error: "Failed to send to Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in send-order API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
