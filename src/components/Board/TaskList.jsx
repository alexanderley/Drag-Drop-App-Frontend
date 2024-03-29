import React, { useContext } from "react";

import "./TaskList.scss";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ModalContext } from "../../context/modal.context";
import { BoardContext } from "../../context/board.context";

export default function TasksList({ name, tasks, _id }) {
  const { setAddNewTaskFormIsVisible } = useContext(ModalContext);
  const { boards, setBoard, activeBoardId, activeDraftId, setActiveDraftId } =
    useContext(BoardContext);
  // console.log("😘 _id:", _id);

  const addTaskClickHandler = () => {
    console.log("This is the id 🤢", _id);
    setAddNewTaskFormIsVisible(true);
    setActiveDraftId(_id);
  };

  return (
    <Droppable droppableId={_id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ height: "100%" }}
        >
          <div
            className={`taskContainer ${
              tasks.length === 0 ? "emptyTaskList" : ""
            }`}
          >
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
                    <div className="taskContentContainer">
                      <span className="headingM"> {task.title}</span>
                      <span className="bodyM subtasks">0 of 0 subtasks</span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div className="addTaskButton" onClick={addTaskClickHandler}>
              + Add Task
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}
