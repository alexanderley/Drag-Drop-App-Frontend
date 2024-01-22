import React, { useContext, useState } from "react";

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

    // const indexOfActiveDraft = draftsOfActiveBoard.indexOf(activeDraftId);
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
      // const newData = boards[indexOfActiveBoard].drafts[indexOfActiveDraft];

      // const boardsNewDraft = boards[indexOfActiveBoard].drafts[
      //   indexOfActiveDraft
      // ].tasks.push({ _id: "emptyId", title: taskTitle });

      // console.log(boardsNewDraft);
      // setBoards(boardsNewDraft);

      const updatedBoards = [...boards];

      const updatedTasks = [
        ...updatedBoards[indexOfActiveBoard].drafts[indexOfActiveDraft].tasks,
      ];

      updatedTasks.push({ _id: "emptyId", title: taskTitle });

      console.log(updatedTasks);

      setBoards(updatedBoards);
    }

    // const storedToken = localStorage.getItem("authToken");

    // try {
    //   const requestBody = { title: taskTitle, taskId: activeDraftId };
    //   const response = await axios.post(`${API_URL}/addTask`, requestBody, {
    //     headers: { Authorization: `Bearer ${storedToken}` },
    //   });
    //   const data = response.data;
    //   setAddNewDraftFormIsVisible(false);
    //   setActiveDraftId("");
    // } catch (err) {
    //   console.error(err);
    // }
    // console.log("New Task send to the server!");
  };

  // const addTaskFormHandler = async (e) => {
  //   e.preventDefault();

  //   const indexOfActiveBoard = boards.findIndex(
  //     (board) => board._id === activeBoardId
  //   );

  //   const draftsOfActiveBoard = boards[indexOfActiveBoard].drafts;
  //   const indexOfActiveDraft = draftsOfActiveBoard.findIndex(
  //     (draft) => draft._id === activeDraftId
  //   );

  //   // check if the active board could be found
  //   if (indexOfActiveBoard !== -1 && indexOfActiveDraft !== -1) {
  //     // Create a copy of the current state
  //     const updatedBoards = [...boards];

  //     // Create a copy of the tasks array in the selected draft
  //     const updatedTasks = [
  //       ...updatedBoards[indexOfActiveBoard].drafts[indexOfActiveDraft].tasks,
  //     ];

  //     // Add the new task to the copied tasks array
  //     updatedTasks.push({ _id: "emptyId", title: taskTitle });

  //     // Update the tasks array in the copied draft
  //     updatedBoards[indexOfActiveBoard].drafts[indexOfActiveDraft].tasks =
  //       updatedTasks;

  //     // Update the state with the modified copy
  //     setBoards(updatedBoards);
  //   }

  //   setAddNewDraftFormIsVisible(false);
  //   setActiveDraftId("");
  // };

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
