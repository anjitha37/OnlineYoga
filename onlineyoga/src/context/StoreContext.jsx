import React, { createContext } from "react";

// Create Context
export const StoreContext = createContext();

// Context Provider Component
export const StoreProvider = ({ children }) => {
  // ✅ Use environment variable for backend API URL
  const url = import.meta.env.VITE_API_URL || "https://onlineyoga-backend.onrender.com";

  return (
    <StoreContext.Provider value={{ url }}>
      {children}
    </StoreContext.Provider>
  );
};
