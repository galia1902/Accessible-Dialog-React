import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Dialog } from "./dialog";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      persistentFocus: false,
    };
    
  }

  enableSelection() {
    this.setState({ persistentFocus: false });
  }

  disableSelection() {
    this.setState({ persistentFocus: true });
  }



  render() {
    const ariaHiddenProp = this.state.isDialogOpen ? { 'aria-hidden': true } : {}
    return (
      <div className="App">
        <Dialog
          persistentFocus={this.state.persistentFocus}
          open={this.state.isDialogOpen}
          onClose={() => this.setState({isDialogOpen: false}) 
          }
          >
          {closeDialog => (
            <div>
              <button className="close" onClick={closeDialog}  tabIndex={2}></button>
              <div>
              This is some message 
              </div>
               
            </div>
          )}
        </Dialog>
        <div {...ariaHiddenProp}>
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
      </div>
    );
  }
}

export default App;
