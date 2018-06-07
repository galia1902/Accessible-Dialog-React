import React from "react";
import ReactDOM from "react-dom";
import FocusLock from "react-focus-lock";

import "./dialog.css";


const dialogContainer = document.querySelector("#portal");

export class Dialog extends React.Component {
  static defaultProps = {
    dialogProps: {},
    open: false,
    onClose: () => {}
  };

  containerEl;
  state = {
    disabled: true
  };

  constructor(props) {
    super(props);
    this.containerEl = document.createElement("div");
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.boxRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.open !== !state.disabled) {
      return { disabled: !props.open };
    }
    return null;
  }

  componentDidMount() {
    dialogContainer.appendChild(this.containerEl);
    this.boxRef.current && this.boxRef.current.focus();
  }

  componentWillUnmount() {
    dialogContainer.removeChild(this.containerEl);
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      this.boxRef.current.focus();
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  }

  // toggle = () => this.setState({ disabled: !this.state.disabled });

  renderDialogBlock() {
    const { disabled } = this.state;
    // const {  } = this.props;
    const { persistentFocus,children, dialogProps, closeButton, onClose, open } = this.props;
    return (
      <FocusLock
        disabled={this.state.disabled}
        persistentFocus={persistentFocus}
      >
        {!disabled && (
          <div
            className="dialog-container"
            style={{ display: open ? "block" : "none" }}
          >
            <div className="overlay" onClick={onClose} />
            <div
              {...dialogProps}
              className="box"
              tabIndex={-1}
              autoFocus
              ref={this.boxRef}
              onKeyDown={this.handleKeyPress}
            >
              <div role="document" tabIndex={2}>
                {this.props.children(onClose)}
              </div>
            </div>
          </div>
        )}
      </FocusLock>
    );
  }

  render() {
    return ReactDOM.createPortal(this.renderDialogBlock(), this.containerEl);
  }
}
