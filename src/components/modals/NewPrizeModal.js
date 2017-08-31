import React from 'react';
import QuokkaModal from '../shared/QuokkaModal';

class NewPrizeModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.getBody = this.getBody.bind(this);
    this.updateAndShow = this.updateAndShow.bind(this);

    this.state = {
      showModal: false,
      prize: this.props.prize,
      sponsor: this.props.sponsor
    };
  }

  updateAndShow(obj) {
    obj.showModal = true;
    this.setState(obj);
  }

  getBody() {
    return (
      <div>{this.state.prize}</div>
    );
  }
}

export default NewPrizeModal;