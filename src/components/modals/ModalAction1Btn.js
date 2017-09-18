import React, { Component } from 'react';
import HorizSpinner from '../widgets/spinners/HorizSpinner';

class ModalAction1Btn extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getSpinner = this.getSpinner.bind(this);
    this.getButton = this.getButton.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  getSpinner() {
    if (this.props.sending) {
      return <HorizSpinner />;
    }
  }

  getButton() {
    if (this.props.sending) {
      return <button style={{ color: 'transparent' }}>{'Sending...'}</button>;
    }

    return <button onClick={this.onClick}>{this.props.text || ''}</button>;
  }

  render() {
    return (
      <div className="modal-action-1-btn">
        <div className="modal-action-btn">
          {this.getButton()}
        </div>
        {this.getSpinner()}
      </div>
    );
  }
}

export default ModalAction1Btn;

