"use client";
import React, { useEffect, useState } from "react";

const PreferTheme = () => {
  const [theme, setTheme] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const save = localStorage.getItem("theme") || "";
      if(save.length){
              document.documentElement.classList.add(save==='dark' ?'dark':'')
      };
      const initiatTheme =
        save === "dark" || save === "light"
          ? save
          : mediaQuery
          ? "dark"
          : "light";
      setTheme(initiatTheme);
      document.documentElement.classList.toggle("dark", initiatTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  console.log(theme);

  return (
    <div>
      <button
        onClick={() => {
          setTheme("dark");
        }}
      >
        dark
      </button>

      <br />

      <button
        onClick={() => {
          setTheme("light");
        }}
      >
        light
      </button>
    </div>
  );
};

export default PreferTheme;
