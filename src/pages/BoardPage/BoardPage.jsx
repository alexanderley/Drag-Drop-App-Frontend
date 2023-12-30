import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/board.context";

import { useNavigate, useParams } from "react-router-dom";

import "./BoardPage.scss";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";

import DraftList from "../../components/Board/DraftList";
import BoardSelection from "../../components/Board/BoardSelection";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

import AddNewDraftForm from "../../components/Ui/forms/AddNewDraftForm";
import { ModalContext } from "../../context/modal.context";
import { SidebarContext } from "../../context/sidebar.context";

function BoardPage() {
  const { boardId } = useParams();
  const { addNewTaskFormIsVisible } = useContext(ModalContext);
  const { sideBarIsVisible } = useContext(SidebarContext);

  console.log("boardId 🛹: ", boardId);

  const [sideMenuVisible, setSideMenuVisible] = useState(true);

  return (
    <div className="boardPageWrapper">
      {/* <CreateBoard fetchBoards={fetchBoards} />
      <CreateDraft fetchBoards={fetchBoards} /> */}
      {addNewTaskFormIsVisible ? <AddNewDraftForm /> : ""}
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
