import React from "react";
import "./styles.scss";

const IconButton = ({ type = "button", text, ariaLabel, faIcon, onClick }) => (
  <button
    className={"icon-button"}
    type={type}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {text}
    <i className={`${faIcon ? `fa fa-${faIcon}` : ""}`} aria-hidden="true"></i>
  </button>
);

export default IconButton;
