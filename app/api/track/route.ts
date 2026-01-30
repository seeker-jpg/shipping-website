import { type NextRequest, NextResponse } from "next/server";

interface VisitorData {
  sessionId: string;
  page: string;
  language: string;
  screenResolution: string;
  timezone: string;
  referrer: string;
  userAgent: string;
}

// Parse user agent to get OS and browser
function parseUserAgent(ua: string): { os: string; browser: string } {
  let os = "Inconnu";
  let browser = "Inconnu";

  // Detect OS
  if (ua.includes("Windows NT 10")) os = "Windows 10/11";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("iPhone")) os = "iOS (iPhone)";
  else if (ua.includes("iPad")) os = "iOS (iPad)";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";

  // Detect Browser
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  return { os, browser };
}

export async function POST(request: NextRequest) {
  try {
    const data: VisitorData = await request.json();

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ success: true, message: "Tracking disabled" });
    }

    // Get IP from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "Inconnu";

    // Parse user agent
    const { os, browser } = parseUserAgent(data.userAgent);

    // Get geolocation data from IP (using free API)
    let location = "Inconnu";
    let country = "??";
    let city = "Inconnu";
    let isp = "Inconnu";
    let lat = "0";
    let lon = "0";

    if (ip && ip !== "::1" && ip !== "127.0.0.1" && ip !== "Inconnu") {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,isp,lat,lon`);
        const geoData = await geoResponse.json();
        
        if (geoData.status === "success") {
          country = geoData.countryCode || "??";
          city = geoData.city || "Inconnu";
          location = `${city}, ${country}`;
          isp = geoData.isp || "Inconnu";
          lat = geoData.lat?.toString() || "0";
          lon = geoData.lon?.toString() || "0";
        }
      } catch {
        // Geolocation failed, use defaults
      }
    } else {
      location = "Local";
      country = "LO";
    }

    const now = new Date();
    const formattedTime = now.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;

    const message = `
🔍 *Session :* \`${data.sessionId}\`
📄 *Nouvel acces a la page* ${data.page}

🌐 *IP:* ${ip}
📍 *Localisation:* ${location}
🗺️ *Latitude :* ${lat}
🗺️ *Longitude :* ${lon}
📌 [Voir sur Google Maps](${googleMapsLink})

💻 *Systeme:* ${os}
🌐 *Navigateur:* ${browser}
📡 *FAI:* ${isp}

⏰ *Heure:* ${formattedTime}
🔗 *Referrer:* ${data.referrer || "Direct"}
🌍 *Langue:* ${data.language}
📱 *Ecran:* ${data.screenResolution}
🕐 *Fuseau:* ${data.timezone}
`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const payload: Record<string, unknown> = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram tracking error:", result);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in track API:", error);
    return NextResponse.json({ success: true }); // Don't break user experience
  }
}
