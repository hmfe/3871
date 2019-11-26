import React from "react";
import ButtonPage from "./Views/Button";
import HomePage from "./Views/Home";
import "./App.scss";
import { Route, NavLink, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <h1>HM3871</h1>
        <ul className="links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/button">Button</NavLink>
          </li>
        </ul>
        <div className="content">
          <Route exact path="/" component={HomePage} />
          <Route path="/button" component={ButtonPage} />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
