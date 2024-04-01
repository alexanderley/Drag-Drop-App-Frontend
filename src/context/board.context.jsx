import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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

  // fetches data from the boards
  const fetchBoards = async () => {
    console.log("🐧 Fetch is going on..............");
    try {
      const response = await axios.get(`${API_URL}/getBoards`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data.boards;
      console.log("fetching data", data);

      // Guard clause will prevent Board from setting if there is no data
      // if (boards[0]._id === 0) {
      //   return;
      // }

      setBoards(data);
      console.log("this is the dara  🏓:", data);
      setBoardsFechted(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("Fetching again the boards.........", boards);
    fetchBoards();
  }, []);

  useEffect(() => {
    console.log("Show boards: ✨", boards);
  }, [boards]);

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
        activeDraftId,
        setActiveDraftId,
        fetchBoards,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}

export { BoardProviderWrapper, BoardContext };

// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import API_URL from "../../apiKey";
// import { useNavigate } from "react-router-dom";

// const BoardContext = React.createContext();

// function BoardProviderWrapper(props) {
//   const [boardsFetched, setBoardsFetched] = useState(false);
//   const navigate = useNavigate();
//   const [boards, setBoards] = useState([]);
//   const [activeBoardId, setActiveBoardId] = useState(null);

//   const storedToken = localStorage.getItem("authToken");

//   // Fetch boards from the server
//   const fetchBoards = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/getBoards`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });
//       const data = response.data.boards;
//       setBoards(data);
//       setBoardsFetched(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBoards();
//   }, []);

//   useEffect(() => {
//     // Set active board to the first board when boards are fetched
//     if (boards.length > 0 && !activeBoardId) {
//       setActiveBoardId(boards[0]._id);
//     }
//   }, [boards, activeBoardId]);

//   useEffect(() => {
//     // Redirect to the first board when activeBoardId is set
//     if (activeBoardId) {
//       navigate(`/boards/${activeBoardId}`);
//     }
//   }, [navigate, activeBoardId]);

//   return (
//     <BoardContext.Provider
//       value={{
//         boards,
//         setBoards,
//         boardsFetched,
//         activeBoardId,
//         setActiveBoardId,
//         fetchBoards,
//       }}
//     >
//       {props.children}
//     </BoardContext.Provider>
//   );
// }

// export { BoardProviderWrapper, BoardContext };
