import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BoardContext } from "../../context/board.context";

import iconBoard from "../../img/icon-board.svg";

import "./BoardSelection.scss";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import { SidebarContext } from "../../context/sidebar.context";

export default function BoardSelection() {
  const {
    boards,
    activeBoardIndex,
    setActiveBoardIndex,
    activeBoardId,
    setActiveBoardId,
    fetchBoards,
  } = useContext(BoardContext);
  const { sideBarIsVisible, setVisibilityHandler } = useContext(SidebarContext);

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

  const hideClickHandler = () => {
    console.log("Sidebar is visibile 🤳", sideBarIsVisible);
    setVisibilityHandler();
  };

  return (
    <div
      className={`boardsSelection ${
        !sideBarIsVisible ? "sideBarHidden" : "sideBarVisible"
      }`}
    >
      <div className="topSection">
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
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
      </div>
      <div className="bottomSection">
        <ThemeChanger />
        <div className="hideSidebar" onClick={hideClickHandler}>
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
          </svg>

          <span>Hide Sidebar</span>
          <button className="makeVisibleButton">
            <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                fill="#FFF"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
