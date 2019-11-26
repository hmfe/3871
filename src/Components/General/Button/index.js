import React from "react";
import "./styles.scss";

const Button = ({ type = "button", text, ariaLabel }) => (
  <button type={type} className="btn" aria-label={ariaLabel}>
    {text}
  </button>
);

export default Button;
