import React, { useContext, useEffect, useState } from "react";
import "./BoardPage.scss";
import { BoardContext } from "../../context/board.context";

import { useNavigate, useParams } from "react-router-dom";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";

import DraftList from "../../components/Board/DraftList";
import BoardSelection from "../../components/Board/BoardSelection";

function BoardPage() {
  const { boardId } = useParams();
  console.log("boardId 🛹: ", boardId);

  return (
    <>
      {/* <CreateBoard fetchBoards={fetchBoards} />
      <CreateDraft fetchBoards={fetchBoards} /> */}
      {/* <Board /> */}
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
