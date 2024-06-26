import React, { useContext, useState } from "react";
import axios from "axios";
import API_URL from "../../../../apiKey";

import "./AddNewDraftForm.scss";
import Modal from "../modals/Modal";
import ButtonSecondary from "../../Ui/ButttonSecondaryViolet";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../../context/modal.context";
import { BoardContext } from "../../../context/board.context";

export default function AddNewDraftForm() {
  const { boardId } = useParams();
  const { setAddNewDraftFormIsVisible } = useContext(ModalContext);
  const { fetchBoards } = useContext(BoardContext);
  const [draftTitle, setDraftTitle] = useState("");

  const addDraftFormSubHandler = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    try {
      const requestBody = { title: draftTitle, boardId };
      const response = await axios.post(`${API_URL}/addDraft`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data;
      setAddNewDraftFormIsVisible(false);

      console.log("axiosData: ", data);
      fetchBoards();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDraftTitleChange = (e) => {
    setDraftTitle(e.target.value);
  };

  return (
    <>
      <Modal>
        <div className="addNewDraftModalContainer">
          <form className="addDraftForm" onSubmit={addDraftFormSubHandler}>
            <h2>Add new Draft</h2>
            <label>Draft Name</label>
            <input
              type="text"
              placeholder="Draft Name"
              value={draftTitle}
              onChange={handleDraftTitleChange}
            />
            <label>Colors</label>
            <ButtonSecondary type="submit">Add Draft</ButtonSecondary>
          </form>
        </div>
      </Modal>
    </>
  );
}
