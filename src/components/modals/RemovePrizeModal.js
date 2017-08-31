import React from 'react';

import ModalAction2Btns from './ModalAction2Btns';
import QuokkaModal from '../shared/QuokkaModal';

class RemovePrizeModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.getBody = this.getBody.bind(this);
    this.removePrize = this.removePrize.bind(this);

    this.state = {
      showModal: false,
      prizeUid: this.props.prizeUid,
      prizeText: this.props.prizeText
    };
  }

  removePrize() {
    if (this.props.onRemovePrize) {
      this.props.onRemovePrize(this.props.prizeUid);
    }
  }

  getBody() {
    return (
      <div id="removePrizeModalBody">
        <div className="center-modal-question">
          Are you sure you want to remove <span className="bold">{this.state.prizeText}</span> as a prize?
        </div>
      </div>
    );
  }

  getFooter() {
    var leftProps = { cancel: true, text: 'No' };
    var rightProps = { text: 'Yes' };

    return <ModalAction2Btns left={leftProps} right={rightProps} onLeftClick={this.close} onRightClick={this.removePrize} />;
  }
}

export default RemovePrizeModal;