// src/utils/helper.js

// Utility function to format currency (for pizza prices, etc.)
export const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };
  
  // Utility function to format the pizza description for better readability
  export const formatDescription = (description) => {
    return description.length > 100
      ? description.slice(0, 100) + '...'
      : description;
  };
  
  // Utility function to get a random item from an array (e.g., for specials or featured items)
  export const getRandomItem = (items) => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };
  
  // Utility function to get the current date in a readable format (useful for display)
  export const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  // Utility function to check if an item is in the cart
  export const isInCart = (cart, itemId) => {
    return cart.some(item => item.id === itemId);
  };
  
  // Function to calculate the total price of items in the cart
  export const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('₹', '')), 0);
  };
  
  // Function to validate if an order is complete (e.g., check if items are in the cart)
  export const isOrderComplete = (cart) => {
    return cart.length > 0;
  };
  