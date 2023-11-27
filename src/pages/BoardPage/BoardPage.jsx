import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/board.context";

import { useNavigate, useParams } from "react-router-dom";

import "./BoardPage.scss";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";

import DraftList from "../../components/Board/DraftList";
import BoardSelection from "../../components/Board/BoardSelection";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

function BoardPage() {
  const { boardId } = useParams();
  const { fetchBoards } = useContext(BoardContext);
  console.log("boardId 🛹: ", boardId);

  const [sideMenuVisible, setSideMenuVisible] = useState(true);

  return (
    <div className="boardPageWrapper">
      {/* <CreateBoard fetchBoards={fetchBoards} />
      <CreateDraft fetchBoards={fetchBoards} /> */}
      <TopNavigation />
      <div className="boardContainer">
        <BoardSelection />
        <DraftList boardId={boardId} />
      </div>
      {/* <button className="makeVisibleButton">Make Visible</button> */}
    </div>
  );
}

export default BoardPage;
