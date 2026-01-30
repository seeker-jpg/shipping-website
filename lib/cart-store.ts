"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "./db";

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, selectedColor?: string, selectedModel?: string) => void
  removeItem: (productId: string, selectedColor?: string, selectedModel?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedModel?: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

// Helper to create unique key for cart item
const getItemKey = (productId: string, color?: string, model?: string) => {
  return `${productId}-${color || 'default'}-${model || 'default'}`
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, selectedColor, selectedModel) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => 
              item.product.id === product.id && 
              item.selectedColor === selectedColor && 
              item.selectedModel === selectedModel
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && 
                item.selectedColor === selectedColor && 
                item.selectedModel === selectedModel
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { 
              product, 
              quantity: 1, 
              selectedColor, 
              selectedModel 
            }],
          }
        })
      },

      removeItem: (productId, selectedColor, selectedModel) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(
              item.product.id === productId && 
              item.selectedColor === selectedColor && 
              item.selectedModel === selectedModel
            )
          ),
        }))
      },

      updateQuantity: (productId, quantity, selectedColor, selectedModel) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedColor, selectedModel)
          return
        }

        set((state) => ({
          items: state.items.map((item) => 
            item.product.id === productId && 
            item.selectedColor === selectedColor && 
            item.selectedModel === selectedModel
              ? { ...item, quantity } 
              : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
