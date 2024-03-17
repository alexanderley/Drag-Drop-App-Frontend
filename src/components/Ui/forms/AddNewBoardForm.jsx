import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Modal from "../modals/Modal";
import ButtonSecondaryViolet from "../ButttonSecondaryViolet";
import { ModalContext } from "../../../context/modal.context";
import API_URL from "../../../../apiKey";
import { BoardContext } from "../../../context/board.context";

export default function AddNewBoardForm() {
  const { setAddNewBoardIsVisible } = useContext(ModalContext);
  const { fetchBoards } = useContext(BoardContext);
  const [boardTitle, setBoardTitle] = useState("");

  useEffect(() => {
    console.log("Boardtitle: ", boardTitle);
  }, [boardTitle]);

  const addBoardFormSubHandler = async (e) => {
    e.preventDefault();
    console.log("send to server");
    if (boardTitle.trim() === "") return;

    const storedToken = localStorage.getItem("authToken");

    try {
      const requestBody = { title: boardTitle };
      const response = await axios.post(`${API_URL}/addBoard`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data;
      console.log("axiosData: ", data);
      setAddNewBoardIsVisible(false);
      boardTitle("");
      // props.fetchBoards();
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
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
          <ButtonSecondaryViolet type="submit">Add Board</ButtonSecondaryViolet>
        </form>
      </Modal>
    </>
  );
}
