import React, { useEffect, useState } from "react";
import "./BoardPage.css";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";
import Board from "../../components/Board/Board";

import API_URL from "../../../apiKey";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function BoardPage() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([{ _id: "0" }]);
  const [drafts, setDrafts] = useState([]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [activeBoardId, setActiveBoardId] = useState("0");

  const { boardId } = useParams();
  // console.log("boardId 🛹: ", boardId);

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

  const handleBoardClick = (index) => {
    setActiveBoardId(boards[index]._id);
    setActiveBoardIndex(index);
    fetchDrafts();
  };

  return (
    <>
      {/* <CreateBoard fetchBoards={fetchBoards} />
      <CreateDraft fetchBoards={fetchBoards} /> */}
      <Board />
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
                  <div className="draftTab" key={draft._id}>
                    <h2>{draft.title}</h2>
                    <div className="taskContainer">
                      {draft.tasks.map((task) => {
                        console.log("task: ", task.title);
                        return (
                          <div className="taskTab" key={task._id}>
                            <span>{task.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardPage;
