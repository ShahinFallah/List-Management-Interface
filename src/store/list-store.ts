import { create } from "zustand"
import type { ListItem } from "../types/item"

type ListStore = {
  items: ListItem[]
  addItem: (title: string, subtitle: string) => void
  updateItem: (id: string, title: string, subtitle: string) => void
  deleteItem: (id: string) => void
}

export const useListStore = create<ListStore>()((set) => ({
  items: [],
  addItem: (title, subtitle) =>
    set((state) => ({
      items: [
        {
          id: crypto.randomUUID(),
          title,
          subtitle,
          createdAt: new Date()
        },
        ...state.items
      ]
    })),
  updateItem: (id, title, subtitle) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, title, subtitle } : item
      )
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    }))
}))
