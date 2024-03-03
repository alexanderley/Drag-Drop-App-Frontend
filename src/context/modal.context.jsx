import React, { createContext, useEffect, useState } from "react";

const ModalContext = createContext();

function ModalProviderWrapper({ children }) {
  const [addNewTaskFormIsVisible, setAddNewTaskFormIsVisible] = useState(false);
  const [addNewDraftFormIsVisible, setAddNewDraftFormIsVisible] =
    useState(false);
  const [addNewBoardFormIsVisible, setAddNewBoardFormIsVisible] =
    useState(false);

  useEffect(() => {
    console.log("Modalvisible: ", addNewBoardFormIsVisible);
  }, [addNewBoardFormIsVisible]);

  return (
    <ModalContext.Provider
      value={{
        addNewTaskFormIsVisible,
        setAddNewTaskFormIsVisible,
        addNewDraftFormIsVisible,
        setAddNewDraftFormIsVisible,
        addNewBoardFormIsVisible,
        setAddNewBoardFormIsVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProviderWrapper, ModalContext };
