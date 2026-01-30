"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "./db";

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrderByNumber: (orderNumber: string) => Order | undefined
  getAllOrders: () => Order[]
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find((order) => order.orderNumber === orderNumber)
      },

      getAllOrders: () => {
        return get().orders
      },
    }),
    {
      name: "order-storage",
    },
  ),
)
