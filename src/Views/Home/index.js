import React, { Component } from "react";
import axios from "axios";
import config from "../../api/config.json";
class HomePage extends Component {
  async componentDidMount() {
    const fetchedData = await axios.get(
      `${config.baseUrl}/?apikey=${config.access_key}&t="Drive"`
    );
    console.log(fetchedData);
  }
  render() {
    return (
      <div>
        <h1>3: Implement a simple search application</h1>
      </div>
    );
  }
}

export default HomePage;
