import React from "react";

import "./ButtonPrimaryL.scss";

export default function ButtonPrimaryL(props) {
  return (
    <button onClick={props.onClick} className="buttonPrimaryL">
      {props.children}
    </button>
  );
}
