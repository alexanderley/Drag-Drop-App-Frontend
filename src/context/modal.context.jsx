import React, { createContext, useState } from "react";

const ModalContext = createContext();

function ModalProviderWrapper({ children }) {
  const [addNewTaskFormIsVisible, setAddNewTaskFormIsVisible] = useState(false);
  const [addNewDraftFormIsVisible, setAddNewDraftFormIsVisible] =
    useState(false);

  return (
    <ModalContext.Provider
      value={{
        addNewTaskFormIsVisible,
        setAddNewTaskFormIsVisible,
        addNewDraftFormIsVisible,
        setAddNewDraftFormIsVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProviderWrapper, ModalContext };
