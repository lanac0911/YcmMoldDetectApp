import { useState } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
