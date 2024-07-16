"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartProducts {
  products: CartProduct[];
  addProductToCart: (product: Product) => void;
}

export const CartContext = createContext<ICartProducts>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, quantity: 0 }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
