import React, { Component } from 'react';

class ModalAction1Btn extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div className="modal-action-1-btn">
        <div className="modal-action-btn">
          <span onClick={this.onClick}>{this.props.text || ''}</span>
        </div>
      </div>
    );
  }
}

export default ModalAction1Btn;

