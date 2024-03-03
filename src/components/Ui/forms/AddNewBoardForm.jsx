import React, { useContext, useState } from "react";
import Modal from "../modals/Modal";
import ButtonSecondaryViolet from "../ButttonSecondaryViolet";
import { ModalContext } from "../../../context/modal.context";

export default function AddNewBoardForm() {
  const { setAddNewBoardIsVisible } = useContext(ModalContext);
  const [boardTitle, setBoardTitle] = useState("");

  const addBoardFormSubHandler = (e) => {
    e.preventDefault();

    console.log("New Board gets send to the server");
  };

  const handleBoardTitleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  return (
    <>
      <Modal>
        <form onSubmit={addBoardFormSubHandler}>
          <label>Create a New Board</label>
          <input
            type="text"
            placeholder="Board Name"
            value={boardTitle}
            onChange={handleBoardTitleChange}
          />
        </form>
        <ButtonSecondaryViolet type="submit">Add Board</ButtonSecondaryViolet>
      </Modal>
    </>
  );
}
