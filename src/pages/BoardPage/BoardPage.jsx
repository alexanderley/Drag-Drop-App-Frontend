import React, { useState } from "react";
import "./BoardPage.css";

import Board from "../../components/Board/Board";

import CreateBoard from "../../components/Board/CreateBoard";
import CreateDraft from "../../components/Board/CreateDraft";

function BoardPage() {
  return (
    <>
      <CreateBoard />
      <CreateDraft />
      {/* <Board /> */}
      <div className="boardContainer">
        <div className="boardsSelection">
          <div className="boardTab">Board 1</div>
          <div className="boardTab">Board 2</div>
          <div className="boardTab">Board 3</div>
        </div>
        <div className="boardOverview">
          <div className="boardDraftContainer">
            <div className="draftTab">Draft 1</div>
            <div className="draftTab">Draft 1</div>
            <div className="draftTab">Draft 1</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardPage;
