import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    
    setIsUserLoggedIn(!!authToken);
    setIsUserAdmin(userRole?.toLowerCase() === "admin");
  }, []);

  const login = (authToken, userRole) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("userRole", userRole);
    setIsUserLoggedIn(true);
    setIsUserAdmin(userRole?.toLowerCase() === "admin");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsUserLoggedIn(false);
    setIsUserAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, isUserAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);