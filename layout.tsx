import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Orbitron } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VisitorTracker } from "@/components/visitor-tracker"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "Corely - Cartes SD Premium à Prix Imbattable | Livraison Gratuite",
  description:
    "Corely : Votre destination pour les cartes SD haute capacité Sony & Lenovo. Stockage premium pour gaming, photo et vidéo à prix mini. Livraison gratuite !",
  generator: "Next.js",
  keywords: ["corely", "carte sd", "carte mémoire", "stockage", "sony", "lenovo", "gaming", "photo", "vidéo", "2tb", "1tb"],
  authors: [{ name: "Corely" }],
  creator: "Corely",
  publisher: "Corely",
  icons: {
    icon: [
      {
        url: "/corely-logo.png",
        type: "image/png",
      },
    ],
    apple: "/corely-logo.png",
  },
  // Open Graph for social sharing
  openGraph: {
    title: "Corely - Cartes SD Premium à Prix Imbattable",
    description: "Votre destination pour les cartes SD haute capacité. Stockage premium pour gaming, photo et vidéo à prix mini !",
    type: "website",
    locale: "fr_FR",
    siteName: "Corely",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Corely - Cartes SD Premium à Prix Imbattable",
    description: "Votre destination pour les cartes SD haute capacité. Stockage premium à prix mini !",
    creator: "@corely",
  },
  // Robots
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
      <body className={`font-sans antialiased ${_orbitron.variable}`}>
        <VisitorTracker />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
