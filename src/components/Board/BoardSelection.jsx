import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BoardContext } from "../../context/board.context";

import iconBoard from "../../img/icon-board.svg";

import "./BoardSelection.scss";
import ThemeChanger from "../ThemeChanger/ThemeChanger";

export default function BoardSelection() {
  const {
    boards,
    activeBoardIndex,
    setActiveBoardIndex,
    activeBoardId,
    setActiveBoardId,
    fetchBoards,
  } = useContext(BoardContext);

  const { boardId } = useParams();
  console.log("boardId 🛹: ", boardId);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    setActiveBoardId(boards[0]._id);
  }, [boards]);

  useEffect(() => {
    if (boards.length > 0) {
      navigate(`/boards/${activeBoardId}`);
    }
  }, [activeBoardId]);

  const handleBoardClick = (index) => {
    setActiveBoardId(boards[index]._id);
    setActiveBoardIndex(index);
    fetchDrafts();
  };

  return (
    <div className="boardsSelection">
      <h4>All Boards(3)</h4>
      {boards
        ? boards.map((board, index) => (
            <div
              className={`boardTab ${
                activeBoardIndex === index ? "activeBoardTab" : ""
              }`}
              key={index}
              onClick={() => handleBoardClick(index)}
            >
              <div className="boardContentContainer">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
                </svg>
                <span> {board.title}</span>
              </div>
            </div>
          ))
        : ""}
      <div className="createNewBoardContainer boardTab">
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
        </svg>
        <span>+ Create a new Board</span>
      </div>
      <ThemeChanger />
    </div>
  );
}
