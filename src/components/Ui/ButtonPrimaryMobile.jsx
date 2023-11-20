import React from "react";

import "./ButtonPrimaryMobile.scss";

export default function ButtonPrimaryMobile(props) {
  return (
    <button onClick={props.onClick} className="buttonPrimaryMobile">
      <span className="mobilePlusIcon">+</span>
    </button>
  );
}
