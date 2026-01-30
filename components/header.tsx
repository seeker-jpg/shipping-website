"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, Sparkles } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"

export function Header() {
  const getItemCount = useCartStore((state) => state.getItemCount)
  const [itemCount, setItemCount] = useState(0)
  const [open, setOpen] = useState(false)

  // Sync cart count on client side only to avoid hydration mismatch
  useEffect(() => {
    setItemCount(getItemCount())
    // Subscribe to store changes
    const unsubscribe = useCartStore.subscribe(() => {
      setItemCount(getItemCount())
    })
    return () => unsubscribe()
  }, [getItemCount])

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/products", label: "Produits" },
    { href: "/orders", label: "Suivi Commande" },
  ]

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Livraison GRATUITE sur toutes les commandes</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline font-bold">Offre limitée !</span>
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="relative text-sm font-bold text-muted-foreground hover:text-foreground transition-colors link-underline py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <Button 
                asChild 
                variant="ghost" 
                size="icon" 
                className="relative group hover:bg-purple-500/10"
              >
                <Link href="/cart">
                  <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-purple-500/50 pulse-glow">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* CTA Button Desktop */}
              <Button 
                asChild 
                className="hidden md:flex btn-cyber bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 font-bold shadow-lg shadow-purple-500/25"
              >
                <Link href="/products">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Commander
                </Link>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="hover:bg-purple-500/10">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-background/95 backdrop-blur-xl border-purple-500/20">
                  <nav className="flex flex-col gap-6 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="text-xl font-bold text-foreground hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-400 transition-all duration-300"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Button 
                      asChild 
                      className="mt-4 btn-cyber bg-gradient-to-r from-purple-600 to-cyan-600 font-bold"
                    >
                      <Link href="/products" onClick={() => setOpen(false)}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Commander Maintenant
                      </Link>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
