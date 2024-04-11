import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Modal from "../modals/Modal";
import ButtonSecondaryViolet from "../ButttonSecondaryViolet";
import { ModalContext } from "../../../context/modal.context";
import API_URL from "../../../../apiKey";
import { BoardContext } from "../../../context/board.context";

export default function AddNewBoardForm() {
  const { setAddNewBoardFormIsVisible } = useContext(ModalContext);
  const { boards, setBoards, fetchBoards } = useContext(BoardContext);
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
      const data = await response.data;
      console.log("axiosData: ", data);
      console.log("This is the board 🏓🏓", data.board);
      const newBoard = data.board;
      setAddNewBoardFormIsVisible(false);
      setBoardTitle("");

      const newBoards = [...boards];
      newBoards.push(newBoard);

      // setBoards(newBoard);
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
