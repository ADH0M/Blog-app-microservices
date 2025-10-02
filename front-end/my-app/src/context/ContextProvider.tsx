"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

// Interfaces
interface Auth {
  session?: string | undefined;
  username?: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
}

export interface AuthContextType {
  auth: Auth;
  theme: string;
  setTheme: (theme: "light" | "dark") => void;
  setAuth: (auth: Auth) => void;
}

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);


const getTheme = () => {
  if (typeof window !== "undefined") {
    const save = localStorage.getItem("theme");
    const initialTheme = window.matchMedia(`(prefers-color-sheme: dark)`);
    if (save) return save;
    if (!save) {
      return initialTheme ? "dark" : "light";
    }
  }
  return "";
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({});
  const [theme, setTheme] = useState<string>(getTheme());

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, theme, setTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
