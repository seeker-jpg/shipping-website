import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VisitorTracker } from "@/components/visitor-tracker"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins" 
})

export const metadata: Metadata = {
  title: "Corely.fr - Accessoires Mobiles Premium | 4.99€ Livraison Gratuite",
  description:
    "Corely.fr : Votre boutique d'accessoires mobiles. Coques iPhone, cables USB-C, chargeurs rapides. Qualite premium a prix mini - 4.99€ avec livraison gratuite !",
  generator: "Next.js",
  keywords: ["corely", "accessoires mobiles", "coque iphone", "cable usb-c", "chargeur", "smartphone", "protection telephone", "france"],
  authors: [{ name: "Corely" }],
  creator: "Corely",
  publisher: "Corely",
  openGraph: {
    title: "Corely.fr - Accessoires Mobiles Premium",
    description: "Votre boutique d'accessoires mobiles. Coques, cables, chargeurs - 4.99€ avec livraison gratuite !",
    type: "website",
    locale: "fr_FR",
    siteName: "Corely",
    url: "https://corely.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corely.fr - Accessoires Mobiles Premium",
    description: "Votre boutique d'accessoires mobiles. Qualite premium a prix mini !",
    creator: "@corelyfr",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased ${_poppins.variable}`}>
        <VisitorTracker />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
