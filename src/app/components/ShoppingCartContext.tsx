"use client";

import { createContext, useContext, useState } from "react";
import data from "../bd.json";

interface CartItem {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface ShoppingCartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

import { ReactNode } from "react";

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: data[0].id,
      name: data[0].titulo,
      image: data[0].imagen,
      price: data[0].price,
      quantity: 1,
    },
    {
      id: data[1].id,
      name: data[1].titulo,
      image: data[1].imagen,
      price: data[1].price,
      quantity: 1,
    },
  ]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Si existe, se aumenta en la cantidad especificada
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item]; // si no, se añade
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart debe usarse dentro de ShoppingCartProvider"
    );
  }
  return context;
};
