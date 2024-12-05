// api.js
const API_BASE_URL = "https://api.yourwebsite.com"; // Replace with your actual API base URL

// Helper function for making API requests
const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    const handleOrderSubmit = async (orderData) => {
        try {
          const response = await placeOrder(orderData);
          console.log('Order placed successfully:', response);
        } catch (error) {
          console.error('Error placing order:', error);
        }
      };
    useEffect(() => {
        const fetchData = async () => {
          const menuItems = await fetchMenuItems();
          setMenu(menuItems);
        };
        fetchData();
      }, []);

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Function to get the menu items
export const fetchMenuItems = async () => {
  try {
    const data = await makeRequest("/menu");
    return data; // Return the menu data
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error; // Rethrow error for further handling
  }
};

// Function to get special offers
export const fetchSpecialOffers = async () => {
  try {
    const data = await makeRequest("/specials");
    return data; // Return the special offers
  } catch (error) {
    console.error("Error fetching special offers:", error);
    throw error;
  }
};

// Function to place an order
export const placeOrder = async (orderData) => {
  try {
    const data = await makeRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData), // Send the order data as JSON
    });
    return data; // Return the response from the order placement
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// Function to get customer info (if needed)
export const fetchCustomerInfo = async (customerId) => {
  try {
    const data = await makeRequest(`/customers/${customerId}`);
    return data; // Return customer data
  } catch (error) {
    console.error("Error fetching customer info:", error);
    throw error;
  }
};
// api.js
const API_BASE_URL = "https://api.yourwebsite.com"; // Replace with your actual API base URL

// Helper function for making API requests
const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Function to get the menu items
export const fetchMenuItems = async () => {
  try {
    const data = await makeRequest("/menu");
    return data; // Return the menu data
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error; // Rethrow error for further handling
  }
};

// Function to get special offers
export const fetchSpecialOffers = async () => {
  try {
    const data = await makeRequest("/specials");
    return data; // Return the special offers
  } catch (error) {
    console.error("Error fetching special offers:", error);
    throw error;
  }
};

// Function to place an order
export const placeOrder = async (orderData) => {
  try {
    const data = await makeRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData), // Send the order data as JSON
    });
    return data; // Return the response from the order placement
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// Function to get customer info (if needed)
export const fetchCustomerInfo = async (customerId) => {
  try {
    const data = await makeRequest(`/customers/${customerId}`);
    return data; // Return customer data
  } catch (error) {
    console.error("Error fetching customer info:", error);
    throw error;
  }
};
