import React, { Component } from "react";
import Button from "../../components/general/button";
import "./styles.scss";

class ButtonPage extends Component {
  render() {
    return (
      <div className={"button-page-container"}>
        <h1>1: CSS-wizardry</h1>
        <Button text="Delete" ariaLabel="Delete" />
      </div>
    );
  }
}

export default ButtonPage;
