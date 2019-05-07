import React from "react";
import "./App.scss";
import AuthContainer from "./components/AuthContainer/AuthContainer";

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <AuthContainer />
      </div>
    );
  }
}

export default App;
