import React, { createContext, useState } from "react";

// const ModalContext = createContext();

// function ModalProviderWrapper({ children }) {
//   const [addNewDraftIsVisible, setAddNewDraftIsVisible] = useState(true);

//   return (
//     <ModalContext.Provider
//       value={{ addNewDraftIsVisible, setAddNewDraftIsVisible }}
//     >
//       {children}
//     </ModalContext.Provider>
//   );
// }

// export { ModalProviderWrapper, ModalContext };

const ModalContext = createContext();

function ModalProviderWrapper({ children }) {
  const [addNewTaskFormIsVisible, setAddNewTaskFormIsVisible] = useState(true);

  return (
    <ModalContext.Provider
      value={{ addNewTaskFormIsVisible, setAddNewTaskFormIsVisible }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProviderWrapper, ModalContext };
