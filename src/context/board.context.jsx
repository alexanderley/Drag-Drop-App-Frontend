import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../apiKey";
import { useNavigate } from "react-router-dom";

const BoardContext = React.createContext();

function BoardProviderWrapper(props) {
  const [boardsFechted, setBoardsFechted] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();
  const [boards, setBoards] = useState([{ _id: 0 }]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [activeBoardId, setActiveBoardId] = useState("0");
  const [activeBoardTitle, setActiveBoardTitle] = useState("");
  const [activeDraftId, setActiveDraftId] = useState("0");

  const storedToken = localStorage.getItem("authToken");

  // fetches data from the boards
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
    fetchBoards();
  }, []);

  useEffect(() => {
    setActiveBoardId(boards[0]._id);
  }, [boardsFechted]);

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
        boardsFechted,
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
