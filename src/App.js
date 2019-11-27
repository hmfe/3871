import React from "react";
import ButtonPage from "./views/button";
import HomePage from "./views/home";
import "./App.scss";
import { Route, NavLink, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <div className="navbar">
          <div className="title">
            <h1>HM3871</h1>
          </div>
          <ul className="links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/button">Button</NavLink>
            </li>
          </ul>
        </div>

        <div className="content">
          <Route exact path="/" component={HomePage} />
          <Route path="/button" component={ButtonPage} />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
