import React from "react";

import "./ButtonSquare.scss";

export default function ButtonSquareL(props) {
  return (
    <button onClick={props.onClick} className="buttonSquareL">
      {props.children}
    </button>
  );
}
