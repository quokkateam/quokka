import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';


class QuokkaModal extends Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  getHeader() {
    // overwrite in child class
  }

  getBody() {
    // overwrite in child class
  }

  getFooter() {
    // overwrite in child class
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>{this.getHeader()}</Modal.Header>
        <Modal.Body>{this.getBody()}</Modal.Body>
        <Modal.Footer>{this.getFooter()}</Modal.Footer>
      </Modal>
    );
  }
}

export default QuokkaModal;