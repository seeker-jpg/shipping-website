import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handleFailedPayment(paymentIntent);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) return;

  const message = `
✅ *PAIEMENT STRIPE CONFIRME*
━━━━━━━━━━━━━━━━━━━━

💳 Session: ${session.id.slice(-12)}
📧 Email: ${session.customer_email || "N/A"}
💰 Montant: ${((session.amount_total || 0) / 100).toFixed(2)}EUR

👤 ${session.metadata?.customerName || "N/A"}
📞 ${session.metadata?.customerPhone || "N/A"}
📍 ${session.metadata?.customerAddress || "N/A"}

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

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) return;

  const message = `
❌ *PAIEMENT STRIPE ECHOUE*
━━━━━━━━━━━━━━━━━━━━

💳 ID: ${paymentIntent.id.slice(-12)}
💰 Montant: ${(paymentIntent.amount / 100).toFixed(2)}EUR
❗ Erreur: ${paymentIntent.last_payment_error?.message || "Inconnue"}

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
