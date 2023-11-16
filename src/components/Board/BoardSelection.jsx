import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BoardContext } from "../../context/board.context";

import "./BoardSelection.scss";

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
      {boards
        ? boards.map((board, index) => (
            <div
              className={`boardTab ${
                activeBoardIndex === index ? "activeBoardTab" : ""
              }`}
              key={index}
              onClick={() => handleBoardClick(index)}
            >
              {board.title}
            </div>
          ))
        : ""}
    </div>
  );
}
