"use client";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== undefined) {
        const mobile = window.matchMedia("(max-width:720px)");
        const tablet = window.matchMedia("(max-width:1180px)");
        const screen = window.matchMedia("(min-width:1181px)");
        if (mobile.matches) {
          setState("isMobile");
        } else if (tablet.matches) {
          setState("isTablet");
        } else if (screen.matches) {
          setState("isScreen");
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return ()=>window.removeEventListener('resize' , handleResize);
  }, []);

  console.log(state, "state  ");

  return <div>Test </div>;
};

export default Test;
