import React, { useContext } from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";
import { ModalContext } from "../../../context/modal.context";

export default function Modal(props) {
  const {
    setAddNewTaskFormIsVisible,
    setAddNewDraftFormIsVisible,
    setAddNewBoardFormIsVisible,
  } = useContext(ModalContext);

  const handleModalClose = () => {
    console.log("close the board.................");
    setAddNewTaskFormIsVisible(false);
    setAddNewDraftFormIsVisible(false);
    // setAddNewBoardFormIsVisible((prevState) => !prevState);
    setAddNewBoardFormIsVisible(false);
  };

  return ReactDOM.createPortal(
    <div className="modal show">
      <div className="modalContent">{props.children}</div>
      <div className="modalBackground" onClick={handleModalClose}></div>
    </div>,
    document.body
  );
}
