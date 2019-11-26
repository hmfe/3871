import React, { Component } from "react";
import Button from "../../Components/General/Button";
class ButtonPage extends Component {
  render() {
    return (
      <div>
        <h2>Button here!</h2>
        <Button text="Delete" ariaLabel="Delete" />
      </div>
    );
  }
}

export default ButtonPage;
