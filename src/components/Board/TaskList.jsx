// import React from "react";

// import "./TaskList.scss";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// export default function TasksList({ name, tasks, _id }) {
//   return (
//     <Droppable droppableId={_id}>
//       {(provided) => (
//         <div {...provided.droppableProps} ref={provided.innerRef}>
//           <div className="taskContainer" >
//             {tasks.map((task, index) => (
//               <Draggable draggableId={task._id} index={index} key={task._id}>
//                 {(draggableProvided) => (
//                   <div
//                     key={index}
//                     {...draggableProvided.dragHandleProps}
//                     {...draggableProvided.draggableProps}
//                     ref={draggableProvided.innerRef}
//                     className="taskTab"
//                   >
//                     <div className="taskContentContainer">
//                       <span className="headingM"> {task.title}</span>
//                       <span className="bodyM subtasks">0 of 0 subtasks</span>
//                     </div>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         </div>
//       )}
//     </Droppable>
//   );
// }

import React from "react";

import "./TaskList.scss";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TasksList({ name, tasks, _id }) {
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
          </div>
        </div>
      )}
    </Droppable>
  );
}
