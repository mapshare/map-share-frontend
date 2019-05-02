import React, { Component } from "react";
import "./App.scss";
import MapBoxContainer from "./components/MapBoxContainer/MapBoxContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapBoxContainer />
      </div>
    );
  }
}

export default App;
