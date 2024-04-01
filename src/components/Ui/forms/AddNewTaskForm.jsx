import React, { useContext, useEffect, useState } from "react";

import API_URL from "../../../../apiKey";
import axios from "axios";

import Modal from "../modals/Modal";
import ButtonSecondary from "../../Ui/ButttonSecondaryViolet";
import { ModalContext } from "../../../context/modal.context";
import { BoardContext } from "../../../context/board.context";
import TasksList from "../../Board/TaskList";

export default function AddNewTaskForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const { setAddNewDraftFormIsVisible } = useContext(ModalContext);
  const { boards, setBoards, activeBoardId, activeDraftId, setActiveDraftId } =
    useContext(BoardContext);

  const addTaskFormHandler = async (e) => {
    console.log("ID on request 🍺", activeDraftId);
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    // console.log("Open Modal, this is the id: ", _id);
    console.log("Current Boards", boards);
    console.log("Active BoardId", activeBoardId);
    console.log("Active DraftId:", activeDraftId);

    // find the board index
    const indexOfActiveBoard = boards.findIndex(
      (board) => board._id === activeBoardId
    );

    const draftsOfActiveBoard = boards[indexOfActiveBoard].drafts;
    console.log("Drafts of active Board:", draftsOfActiveBoard);

    const indexOfActiveDraft = draftsOfActiveBoard.findIndex(
      (draft) => draft._id === activeDraftId
    );
    console.log("IndexOfActiveDraft: ", indexOfActiveDraft);

    console.log(
      "These are our new values: 😘✨",
      indexOfActiveBoard,
      indexOfActiveDraft
    );

    // check if the active board could be found
    if (indexOfActiveBoard !== -1 && indexOfActiveDraft !== -1) {
      console.log("Board and Draft could be found 👶");

      const updatedBoards = [...boards];

      const updatedTasks = [
        ...updatedBoards[indexOfActiveBoard].drafts[indexOfActiveDraft].tasks,
      ];

      try {
        const requestBody = { draftId: activeDraftId, title: taskTitle };
        const response = await axios.post(`${API_URL}/addTask`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const data = response.data;
        console.log(data, "This is the data from the server: 🤷‍♀️");
        const taskFromServer = response.data.newTask;
        console.log("Task from Server: 🤞🤞", taskFromServer);
        // Push the task to the array
        updatedTasks.push(taskFromServer);
      } catch (err) {
        console.err(
          err,
          "Something went wrong while adding task to the draft on server ❌"
        );
      }

      console.log("these are the updated tasks: ", updatedTasks);

      updatedBoards[indexOfActiveBoard].drafts[indexOfActiveDraft].tasks =
        updatedTasks;

      console.log(updatedBoards);

      setBoards(updatedBoards);
    }
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
          <ButtonSecondary type="submit">Add Task</ButtonSecondary>
        </form>
      </div>
    </Modal>
  );
}
