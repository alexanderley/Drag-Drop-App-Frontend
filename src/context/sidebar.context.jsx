import React, { useEffect, useState } from "react";

const SidebarContext = React.createContext();

function SidebarProviderWrapper(props) {
  const [sideBarIsVisible, setSideBarIsVisible] = useState(true);

  const setVisibilityHandler = () => {
    console.log("change visibility 🤢", sideBarIsVisible);
    return setSideBarIsVisible(!sideBarIsVisible);
  };

  return (
    <SidebarContext.Provider
      value={{
        sideBarIsVisible,
        setVisibilityHandler,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
}

export { SidebarProviderWrapper, SidebarContext };
