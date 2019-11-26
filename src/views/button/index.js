import React, { Component } from "react";
import Button from "../../components/general/button";
class ButtonPage extends Component {
  render() {
    return (
      <div>
        <h1>1: CSS-wizardry</h1>
        <Button text="Delete" ariaLabel="Delete" />
      </div>
    );
  }
}

export default ButtonPage;
