import React from "react";

import "./ButtonSecondaryViolet.scss";

export default function ButtonSecondaryViolet(props) {
  return (
    <button type={props.type} className="buttonSecondaryViolet">
      {props.children}
    </button>
  );
}
