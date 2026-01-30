"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Generate a unique session ID
function generateSessionId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === "undefined") return ""
  
  let sessionId = sessionStorage.getItem("visitor_session_id")
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem("visitor_session_id", sessionId)
  }
  return sessionId
}

// Get page name from pathname
function getPageName(pathname: string): string {
  const pageNames: Record<string, string> = {
    "/": "Accueil",
    "/products": "Catalogue",
    "/cart": "Panier",
    "/checkout": "Paiement",
    "/checkout/success": "Confirmation",
    "/contact": "Contact",
    "/privacy": "Confidentialité",
    "/terms": "CGV",
    "/warranty": "Garantie",
    "/shipping": "Livraison",
    "/returns": "Retours",
    "/orders": "Commandes",
  }
  
  // Check for dynamic product pages
  if (pathname.startsWith("/products/")) {
    return "Produit"
  }
  
  return pageNames[pathname] || pathname
}

export function VisitorTracker() {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string | null>(null)
  const isTracking = useRef(false)

  useEffect(() => {
    // Avoid duplicate tracking for the same page
    if (lastTrackedPath.current === pathname || isTracking.current) {
      return
    }

    isTracking.current = true
    lastTrackedPath.current = pathname

    const trackVisitor = async () => {
      try {
        const sessionId = getSessionId()
        const pageName = getPageName(pathname)

        // Collect visitor data
        const visitorData = {
          sessionId,
          page: pageName,
          language: navigator.language || "unknown",
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          referrer: document.referrer || "Direct",
          userAgent: navigator.userAgent,
        }

        // Send to tracking API
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visitorData),
        })
      } catch (error) {
        // Silently fail - don't break the user experience
        console.debug("[Tracker] Error:", error)
      } finally {
        isTracking.current = false
      }
    }

    // Small delay to not block initial render
    const timeoutId = setTimeout(trackVisitor, 100)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}
