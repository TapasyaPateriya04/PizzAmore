// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useReducer } from "react";

// Create the CartContext
const CartContext = createContext();

// Reducer function to manage cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the item is already in the cart
      { const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Increment the quantity of the existing item
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // Add a new item to the cart
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }; }

    case "REMOVE_FROM_CART":
      // Remove the item if its quantity is 1, otherwise decrement the quantity
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      // Clear all items from the cart
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Initial state for the cart
const initialState = {
  items: [], // Array of cart items
};

// CartProvider component to wrap the app and provide cart state
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate the total price of items in the cart
  const calculateTotal = () =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart: state, dispatch, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export default CartContext;
