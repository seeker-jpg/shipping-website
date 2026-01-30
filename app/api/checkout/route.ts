import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { items, customer, shippingCost = 0 } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Create line items for Stripe
    const lineItems = items.map(
      (item: {
        name: string;
        price: number;
        quantity: number;
        selectedColor?: string;
        selectedModel?: string;
      }) => {
        let description = "";
        if (item.selectedColor) description += `Couleur: ${item.selectedColor}`;
        if (item.selectedModel)
          description += `${description ? " | " : ""}Modele: ${item.selectedModel}`;

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              description: description || undefined,
            },
            unit_amount: Math.round(item.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      }
    );

    // Add shipping if applicable
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Frais de livraison",
            description: "Livraison standard",
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/checkout`,
      customer_email: customer?.email,
      metadata: {
        customerName: `${customer?.firstName} ${customer?.lastName}`,
        customerPhone: customer?.phone,
        customerAddress: `${customer?.address}, ${customer?.postalCode} ${customer?.city}, ${customer?.country}`,
      },
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC"],
      },
      locale: "fr",
    });

    // Send notification to Telegram
    await sendTelegramNotification(customer, items, "en attente");

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation du paiement" },
      { status: 500 }
    );
  }
}

async function sendTelegramNotification(
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
  },
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    selectedColor?: string;
    selectedModel?: string;
  }>,
  status: string
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) {
    console.log("Telegram credentials not configured");
    return;
  }

  const itemsList = items
    .map((item) => {
      let line = `   • ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)}EUR`;
      if (item.selectedColor) line += ` (${item.selectedColor})`;
      if (item.selectedModel) line += ` [${item.selectedModel}]`;
      return line;
    })
    .join("\n");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = `
🛒 *NOUVELLE COMMANDE STRIPE - ${status.toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━

👤 *CLIENT*
Nom: ${customer.firstName} ${customer.lastName}
Email: ${customer.email}
Tel: ${customer.phone}

📍 *ADRESSE*
${customer.address}
${customer.postalCode} ${customer.city}
${customer.country}

📦 *ARTICLES*
${itemsList}

💰 *TOTAL: ${total.toFixed(2)}EUR*

⏰ ${new Date().toLocaleString("fr-FR")}
`;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const body: Record<string, unknown> = {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    };

    if (threadId) {
      body.message_thread_id = Number.parseInt(threadId);
    }

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Telegram notification error:", error);
  }
}
