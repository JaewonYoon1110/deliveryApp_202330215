import { create } from 'zustand';

export interface CartItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (newItem) => set((state) => {
    const existingIndex = state.items.findIndex(item => item.menuId === newItem.menuId);
    if (existingIndex > -1) {
      const updatedItems = [...state.items];
      updatedItems[existingIndex].quantity += 1;
      return { items: updatedItems };
    }
    return { items: [...state.items, { ...newItem, quantity: 1 }] };
  }),
  clearCart: () => set({ items: [] }),
}));