import React, { useContext, useEffect, useState } from "react";
import "./BoardPage.scss";
import { BoardContext } from "../../context/board.context";

import { useNavigate, useParams } from "react-router-dom";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";

import DraftList from "../../components/Board/DraftList";
import BoardSelection from "../../components/Board/BoardSelection";
import TopNavigation from "../../components/TopNavigation/TopNavigation";

function BoardPage() {
  const { boardId } = useParams();
  const { fetchBoards } = useContext(BoardContext);
  console.log("boardId 🛹: ", boardId);

  return (
    <>
      {/* <CreateBoard fetchBoards={fetchBoards} />
      <CreateDraft fetchBoards={fetchBoards} /> */}
      <TopNavigation />
      <div className="boardContainer">
        <BoardSelection />
        <div className="boardOverview">
          <DraftList boardId={boardId} />
        </div>
      </div>
    </>
  );
}

export default BoardPage;
