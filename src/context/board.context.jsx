import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../apiKey";
import { useNavigate } from "react-router-dom";

const BoardContext = React.createContext();

function BoardProviderWrapper(props) {
  const [hasBoardsChanged, setHasBoardsChanged] = useState(false);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([{ _id: 0 }]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [activeBoardId, setActiveBoardId] = useState("0");
  const [activeBoardTitle, setActiveBoardTitle] = useState("");
  const [activeDraftId, setActiveDraftId] = useState("0");

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
    setActiveBoardId(boards[0]._id);
    fetchBoards();
  }, []);

  useEffect(() => {
    if (boards[0]._id !== 0) {
      console.log("Empty");
    }
    console.log("Full");
    setActiveBoardId(boards[0]._id);
  }, [boards]);

  // useEffect(() => {
  //   console.log("boards have been modified: 🌭", boards);
  //   setActiveBoardId(boards[0]._id);
  //   setActiveBoardTitle(boards[0].title);
  // }, [boards]);

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
    <BoardContext.Provider
      value={{
        boards,
        setBoards,
        activeBoardIndex,
        setActiveBoardIndex,
        activeBoardId,
        setActiveBoardId,
        activeBoardTitle,
        setActiveBoardTitle,
        fetchBoards,
        activeDraftId,
        setActiveDraftId,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

export { BoardProviderWrapper, BoardContext };
