import React, { useEffect, useState } from "react";
import axios from "axios";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TasksList from "./TaskList";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../../apiKey";

export default function DraftList(props) {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const boardId = props.boardId;

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

  useEffect(() => {
    fetchDrafts();
  }, [props.boardId]);

  useEffect(() => {
    console.log("Draft update 🌹🌹🌹", drafts);
    updateDrafts();
  }, [drafts]);

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

  const updateDrafts = async () => {
    try {
      if (drafts.length > 0) {
        const updatedDrafts = drafts.map((draft) => ({
          _id: draft._id,
          tasks: draft.tasks.map((task) => ({ _id: task._id })),
        }));

        console.log("Tasks as array of objects: ✨✨😃", updatedDrafts);

        const response = await axios.put(
          `${API_URL}/updateDrafts`,
          { boardId, drafts: updatedDrafts },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
  );
}
