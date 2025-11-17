// src/store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // 加入商品（數量 +1）
      addItem: product => {
        set(state => {
          const existingItem = state.items.find(
            item => item.product.id === product.id,
          );

          if (existingItem) {
            // 已存在，數量 +1
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            // 新商品，數量設為 1
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        });
      },

      // 移除商品
      removeItem: productId => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },

      // 增加數量
      increaseQuantity: productId => {
        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      // 減少數量
      decreaseQuantity: productId => {
        set(state => {
          const item = state.items.find(i => i.product.id === productId);

          if (!item) return state;

          if (item.quantity <= 1) {
            // 數量為 1 時，直接移除
            return {
              items: state.items.filter(i => i.product.id !== productId),
            };
          } else {
            // 數量 -1
            return {
              items: state.items.map(i =>
                i.product.id === productId
                  ? { ...i, quantity: i.quantity - 1 }
                  : i,
              ),
            };
          }
        });
      },

      // 更新數量
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      // 清空購物車
      clearCart: () => {
        set({ items: [] });
      },

      // 獲取總商品數量
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // 獲取總價格
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total + parseFloat(item.product.price) * item.quantity,
          0,
        );
      },

      // 獲取某商品的數量
      getItemQuantity: productId => {
        const item = get().items.find(i => i.product.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
