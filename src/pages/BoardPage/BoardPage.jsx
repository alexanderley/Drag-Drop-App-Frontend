import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/board.context";

import { useNavigate, useParams } from "react-router-dom";

import "./BoardPage.scss";

import DraftList from "../../components/Board/DraftList";
import BoardSelection from "../../components/Board/BoardSelection";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

import AddNewDraftForm from "../../components/Ui/forms/AddNewDraftForm";
import { ModalContext } from "../../context/modal.context";
import { SidebarContext } from "../../context/sidebar.context";
import AddNewTaskForm from "../../components/Ui/forms/AddNewTaskForm";

function BoardPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { addNewDraftFormIsVisible, addNewTaskFormIsVisible } =
    useContext(ModalContext);
  const { sideBarIsVisible } = useContext(SidebarContext);

  const { boards, activeBoardId } = useContext(BoardContext);

  console.log("boardId 🛹: ", boardId);

  const [sideMenuVisible, setSideMenuVisible] = useState(true);

  return (
    <div className="boardPageWrapper">
      {addNewDraftFormIsVisible ? <AddNewDraftForm /> : ""}
      {addNewTaskFormIsVisible ? <AddNewTaskForm /> : ""}
      {/* {addNewTaskFormIsVisible ? <AddNewDraftForm /> : ""} */}
      <TopNavigation />
      <div
        className={`boardContainer ${
          !sideBarIsVisible ? "boardContainerExtendet" : ""
        }`}
      >
        <BoardSelection />
        <DraftList boardId={boardId} />
      </div>
      {/* <button className="makeVisibleButton">Make Visible</button> */}
    </div>
  );
}

export default BoardPage;
