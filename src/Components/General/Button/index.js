import React from "react";
import "./styles.scss";

const Button = ({ text, ariaLabel }) => (
  <React.Fragment>
    <button className="btn" aria-label={ariaLabel}>
      {text}
    </button>
  </React.Fragment>
);

export default Button;
