import React, { useEffect, useState } from "react";
import "./BoardPage.css";

import Board from "../../components/Board/Board";

import { useNavigate, useParams } from "react-router-dom";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";
import axios from "axios";
import API_URL from "../../../apiKey";

function BoardPage() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([{ _id: "0" }]);
  const [drafts, setDrafts] = useState([{ title: "the title" }]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [activeBoardId, setActiveBoardId] = useState("0");

  const { boardId } = useParams();
  console.log("boardId 🛹: ", boardId);

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

  const fetchDrafts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getDrafts/${boardId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data.drafts;
      setDrafts(data);
      console.log("the draft state ⚛: ", drafts);
      console.log("Drafts from server: 🐱‍🚀", data);
    } catch (err) {
      console.error(err);
    }
  };

  // fetch Boards
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

  useEffect(() => {
    fetchDrafts();
  }, [boardId]);

  useEffect(() => {
    console.log("drafts changed", drafts);
  }, [drafts]);

  const handleBoardClick = (index) => {
    setActiveBoardId(boards[index]._id);
    setActiveBoardIndex(index);
    fetchDrafts();
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
            {drafts
              ? drafts.map((draft) => (
                  <div className="draftTab">{draft.title}</div>
                ))
              : ""}
            {/* <div className="draftTab">Draft 1</div>
            <div className="draftTab">Draft 1</div>
            <div className="draftTab">Draft 1</div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardPage;
