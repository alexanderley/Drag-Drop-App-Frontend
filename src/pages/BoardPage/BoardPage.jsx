import React, { useEffect, useState } from "react";
import "./BoardPage.css";

import Board from "../../components/Board/Board";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";
import axios from "axios";
import API_URL from "../../../apiKey";

function BoardPage() {
  const [boards, setBoards] = useState([]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);

  const storedToken = localStorage.getItem("authToken");

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${API_URL}/getBoards`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data.boards;
      setBoards(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardClick = (index) => {
    setActiveBoardIndex(index);
  };

  return (
    <>
      <CreateBoard fetchBoards={fetchBoards} />
      <CreateDraft fetchBoards={fetchBoards} />
      {/* <Board /> */}
      <div className="boardContainer">
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
        <div className="boardOverview">
          <div className="boardDraftContainer">
            <div className="draftTab">Draft 1</div>
            <div className="draftTab">Draft 1</div>
            <div className="draftTab">Draft 1</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardPage;
