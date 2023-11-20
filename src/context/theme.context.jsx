import React, { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
  const [isLightTheme, setIsLightMode] = useState(false);

  useEffect(() => {
    const root = document.querySelector(":root");
    if (isLightTheme) {
      root.style.setProperty("--background-color", "var(--white)");
      root.style.setProperty(
        "--second-background-color",
        "var(--background-light)"
      );
      root.style.setProperty("--color", "--black");
      root.style.setProperty("--line-color", "var(--lines-light");
      root.style.setProperty(
        "--buttonSecondaryBackgroundColor",
        "var(--very-light-violet)"
      );
      // root.style.setProperty("--box-shadow", "red");
    } else {
      root.style.setProperty("--background-color", "var(--dark-grey)");
      root.style.setProperty(
        "--second-background-color",
        "var(--very-dark-grey)"
      );
      root.style.setProperty("--line-color", "var(--lines-dark");
      root.style.setProperty("--color", "var(--white)");
      root.style.setProperty(
        "--buttonSecondaryBackgroundColor",
        "var(--white)"
      );
    }
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{ isLightTheme, setIsLightMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeProviderWrapper, ThemeContext };
