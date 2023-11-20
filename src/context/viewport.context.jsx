import React, { createContext, useEffect, useState } from "react";

export const ViewportContext = createContext();

export const ViewportProviderWrapper = ({ children }) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const viewportBreakpoint = 768;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ViewportContext.Provider value={{ viewportWidth, viewportBreakpoint }}>
      {children}
    </ViewportContext.Provider>
  );
};
