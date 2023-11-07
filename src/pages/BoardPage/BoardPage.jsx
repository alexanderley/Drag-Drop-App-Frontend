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

  const handleDragDrop = (results) => {
    console.log("Results: ", results);

    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {
      const reordereddraft = [...drafts];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedDraft] = reordereddraft.splice(sourceIndex, 1);

      reordereddraft.splice(destinationIndex, 0, removedDraft);

      return setDrafts(reordereddraft);
    }

    // 2.) add task change functionality
    console.log("task drop", { destination, source });
    const taskSourceIndex = drafts.findIndex(
      (draft) => draft._id === source.droppableId
    );

    const taskDestinationIndex = drafts.findIndex(
      (draft) => draft._id === destination.droppableId
    );

    const newSourceItems = [...drafts[taskSourceIndex].tasks];

    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...drafts[taskDestinationIndex].tasks]
        : newSourceItems;

    console.log("newDestinationItems: ", newDestinationItems);

    // remove the item from the old array
    const [deletedItem] = newSourceItems.splice(source.index, 1);

    newDestinationItems.splice(destination.index, 0, deletedItem);
    const newDrafts = [...drafts];

    newDrafts[taskSourceIndex] = {
      ...drafts[taskSourceIndex],
      tasks: newSourceItems,
    };

    newDrafts[taskDestinationIndex] = {
      ...drafts[taskDestinationIndex],
      tasks: newDestinationItems,
    };

    setDrafts(newDrafts);
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
          <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable
              droppableId="ROOT"
              type="column"
              direction="horizontal"
              className="boardDraftContainer"
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flexRow"
                >
                  {drafts
                    ? drafts.map((draft, index) => (
                        <Draggable
                          draggableId={draft._id}
                          key={draft._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className="draftTab"
                            >
                              <div>
                                <h2>{draft.title}</h2>
                                {<TasksList {...draft} />}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    : ""}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

function TasksList({ name, tasks, _id }) {
  return (
    <Droppable droppableId={_id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="taskContainer">
            {tasks.map((task, index) => (
              <Draggable draggableId={task._id} index={index} key={task._id}>
                {(draggableProvided) => (
                  <div
                    key={index}
                    {...draggableProvided.dragHandleProps}
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                    className="taskTab"
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default BoardPage;
