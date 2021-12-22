import "./App.css";
import React, { PureComponent } from "react";
import Movies from "./components/Movies";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Movies />
        </div>
      </div>
    );
  }
}

export default App;
