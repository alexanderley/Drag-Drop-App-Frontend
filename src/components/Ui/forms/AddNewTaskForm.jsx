import React, { useContext, useState } from "react";

import API_URL from "../../../../apiKey";
import axios from "axios";

import Modal from "../modals/Modal";
import ButtonSecondary from "../../Ui/ButttonSecondaryViolet";
import { ModalContext } from "../../../context/modal.context";
import { BoardContext } from "../../../context/board.context";

export default function AddNewTaskForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const { setAddNewDraftFormIsVisible } = useContext(ModalContext);
  const [activeTaskId, setActiveTaskId] = useContext(BoardContext);

  const addTaskFormHandler = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    try {
      const requestBody = { title: taskTitle, draftId };
      const response = await axios.post(`${API_URL}/addTask`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data;
      setAddNewDraftFormIsVisible(false);
    } catch (err) {}
    console.log("New Task send to the server!");
  };

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  return (
    <Modal>
      <div className="addNewTaskModalContainer">
        <form className="addTaskForm" onSubmit={addTaskFormHandler}>
          <h2>Add New Task</h2>
          <label>Task Name</label>
          <input
            type="text"
            placeholder="Task Name"
            value={taskTitle}
            onChange={handleTaskTitleChange}
          />
        </form>
        <ButtonSecondary type="submit">Add Task</ButtonSecondary>
      </div>
    </Modal>
  );
}
