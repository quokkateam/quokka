import React from 'react';

import ModalAction2Btns from './ModalAction2Btns';
import QuokkaModal from '../shared/QuokkaModal';

class RemovePrizeModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.removePrize = this.removePrize.bind(this);

    this.state = {
      showModal: false,
      prize: this.props.prize
    };
  }

  removePrize() {
    if (this.props.onRemovePrize) {
      this.props.onRemovePrize({ id: Number(this.state.prize.id) });
    }
  }

  getBody() {
    return (
      <div id="removePrizeModalBody">
        <div className="center-modal-question">
          Are you sure you want to remove <span className="bold">{(this.state.prize || {}).name}</span> as a prize?
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