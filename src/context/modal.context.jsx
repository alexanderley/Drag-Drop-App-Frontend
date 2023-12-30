import React, { createContext, useState } from "react";

const ModalContext = createContext();

function ModalProviderWrapper({ children }) {
  const [addNewTaskFormIsVisible, setAddNewTaskFormIsVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{ addNewTaskFormIsVisible, setAddNewTaskFormIsVisible }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProviderWrapper, ModalContext };
