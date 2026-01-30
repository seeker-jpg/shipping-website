"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Filter, Zap, Smartphone } from "lucide-react"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "name">("name")

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [searchParams])

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)))
  }, [])

  const colors = useMemo(() => {
    return Array.from(new Set(products.filter(p => p.color).map((p) => p.color!)))
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => p.color && selectedColors.includes(p.color))
    }

    filtered.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return a.name.localeCompare(b.name)
    })

    return filtered
  }, [selectedCategories, selectedColors, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
  }

  return (
    <div className="min-h-screen circuit-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-cyan-900/30" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-purple-500/30 px-6 py-3 rounded-full mb-6">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-foreground">COLLECTION COMPLETE</span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-foreground">Tous nos </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Accessoires</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Coques iPhone, cables USB-C et chargeurs rapides. Tout a 4,99€ avec livraison gratuite!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 space-y-6">
            <div className="card-geek rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-black text-xl flex items-center gap-2 text-foreground">
                  <Filter className="w-5 h-5 text-purple-400" />
                  Filtres
                </h2>
                {(selectedCategories.length > 0 || selectedColors.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-cyan-400 hover:text-cyan-300 font-bold"
                  >
                    Reinitialiser
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-4 text-purple-400">Categorie</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-3">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="border-purple-500/50 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <Label
                          htmlFor={`category-${category}`}
                          className="cursor-pointer font-semibold hover:text-purple-400 transition-colors text-foreground"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-4 text-cyan-400">Couleur</h3>
                  <div className="space-y-3">
                    {colors.map((color) => (
                      <div key={color} className="flex items-center space-x-3">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleColor(color)}
                          className="border-cyan-500/50 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                        />
                        <Label
                          htmlFor={`color-${color}`}
                          className="cursor-pointer font-semibold hover:text-cyan-400 transition-colors text-foreground"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-geek rounded-xl p-6">
              <h2 className="font-black text-xl mb-4 text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Trier par
              </h2>
              <div className="space-y-2">
                {[
                  { value: "name", label: "Nom" },
                  { value: "price-low", label: "Prix: Croissant" },
                  { value: "price-high", label: "Prix: Decroissant" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "ghost"}
                    className={`w-full justify-start font-bold ${
                      sortBy === option.value 
                        ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white" 
                        : "hover:bg-purple-500/10 text-foreground"
                    }`}
                    onClick={() => setSortBy(option.value as typeof sortBy)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-lg">
                <span className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {filteredProducts.length}
                </span>
                <span className="text-muted-foreground ml-2">produits disponibles</span>
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="card-geek rounded-2xl p-16 text-center">
                <Smartphone className="w-16 h-16 mx-auto mb-6 text-purple-400 opacity-50" />
                <p className="text-xl text-muted-foreground mb-6">Aucun produit trouve avec ces filtres</p>
                <Button 
                  onClick={clearFilters} 
                  size="lg" 
                  className="btn-cyber bg-gradient-to-r from-purple-600 to-cyan-600 font-bold"
                >
                  Reinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
