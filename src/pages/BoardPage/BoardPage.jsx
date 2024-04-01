import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "./BoardPage.scss";

import { ModalContext } from "../../context/modal.context";
import { SidebarContext } from "../../context/sidebar.context";
import { BoardContext } from "../../context/board.context";

import DraftList from "../../components/Board/DraftList";
import BoardSelection from "../../components/Board/BoardSelection";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

import AddNewDraftForm from "../../components/Ui/forms/AddNewDraftForm";

import AddNewTaskForm from "../../components/Ui/forms/AddNewTaskForm";

function BoardPage() {
  const { boardId } = useParams();
  const { addNewDraftFormIsVisible, addNewTaskFormIsVisible } =
    useContext(ModalContext);
  const { sideBarIsVisible } = useContext(SidebarContext);

  const {
    boards,
    setBoards,
    activeBoardId,
    setActiveBoardId,
    activeBoardIndex,
  } = useContext(BoardContext);

  useEffect(() => {
    if (boardId === "0" && boards.length > 0) {
      console.log(
        "The active board id is 🐧: ",
        activeBoardId,
        boards[activeBoardIndex]._id
      );
      setActiveBoardId("777");
      setActiveBoardId("660b202d3384ab1f161e1940");
      // console.log(activeBoardIndex);
      // setActiveBoardId(boards[activeBoardIndex]._id);
    }
  }, [boardId, boards, activeBoardId]);

  console.log("boardId 🛹: ", boardId);

  return (
    <div className="boardPageWrapper">
      {addNewDraftFormIsVisible ? <AddNewDraftForm /> : ""}
      {addNewTaskFormIsVisible ? <AddNewTaskForm /> : ""}
      <TopNavigation />
      <div
        className={`boardContainer ${
          !sideBarIsVisible ? "boardContainerExtendet" : ""
        }`}
      >
        <BoardSelection />
        <DraftList boardId={boardId} />
      </div>
    </div>
  );
}

export default BoardPage;
