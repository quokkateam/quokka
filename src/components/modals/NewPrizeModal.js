import React from 'react';

import QuokkaModal from '../shared/QuokkaModal';

class NewPrizeModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.getBody = this.getBody.bind(this);

    this.state = {
      showModal: false,
      prize: this.props.prize,
      sponsor: this.props.sponsor
    };
  }

  getBody() {
    return (
      <div id="newPrizeModalBody">
        <div className="image"></div>
      </div>
    );
  }
}

export default NewPrizeModal;