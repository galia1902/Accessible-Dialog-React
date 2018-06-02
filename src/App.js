import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Dialog } from "./dialog";
import FocusLock from "react-focus-lock";

class App extends Component {
  state = {
    isDialogOpen: false,
    persistentFocus: false
  };

  enableSelection = () => this.setState({ persistentFocus: false });
  disableSelection = () => this.setState({ persistentFocus: true });

  render() {
    return (
      <div className="App">
        <Dialog
          persistentFocus={this.state.persistentFocus}
          closeButton
          open={this.state.isDialogOpen}
          onClose={() => this.setState({ isDialogOpen: undefined })}
        >
          Hello this is a dialog box
        </Dialog>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <p className="App-intro">This is a React dialog demo</p>
        <p>
          <button
            className="dialog-btn"
            onClick={() =>
              this.setState({ isDialogOpen: true, persistentFocus: true })
            }
          >
            Check It Out
          </button>
        </p>
      </div>
    );
  }
}

export default App;
