import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../apiKey";
import { useNavigate } from "react-router-dom";

const BoardContext = React.createContext();

function BoardProviderWrapper(props) {
  const [boardsFechted, setBoardsFechted] = useState(false);
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
      setBoardsFechted(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("set active ID 🎂🎂🎂🎂🎂🎂🎂");
    if (boards.length > 0) {
      navigate(`/boards/${activeBoardId}`);
    }
  }, [activeBoardId]);

  useEffect(() => {
    fetchBoards();
    // setActiveBoardId(boards[0]._id);
  }, []);

  useEffect(() => {
    console.log("Boards are changing 🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉");

    setActiveBoardId(boards[0]._id);
  }, [boardsFechted]);

  // useEffect(() => {
  //   console.log("boards have been modified: 🌭", boards);
  //   setActiveBoardId(boards[0]._id);
  //   setActiveBoardTitle(boards[0].title);
  // }, [boards]);

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
