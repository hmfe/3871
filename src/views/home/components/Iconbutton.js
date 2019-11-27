import React from "react";
import "./styles.scss";

const IconButton = ({
  type = "button",
  text,
  ariaLabel,
  faIcon,
  onClick,
  iconType
}) => (
  <button
    className={"icon-button"}
    type={type}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {text}
    {iconType === "em" ? (
      <em
        className={`${faIcon ? `fa fa-${faIcon}` : ""}`}
        aria-hidden="true"
      ></em>
    ) : (
      <i
        className={`${faIcon ? `fa fa-${faIcon}` : ""}`}
        aria-hidden="true"
      ></i>
    )}
  </button>
);

export default IconButton;
