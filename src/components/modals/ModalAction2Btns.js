import React, { Component } from 'react';

class ModalAction2Btns extends Component {

  constructor(props) {
    super(props);
    this.btnClasses = this.btnClasses.bind(this);
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  onLeftClick() {
    if (this.props.onLeftClick) {
      this.props.onLeftClick();
    }
  }

  onRightClick() {
    if (this.props.onRightClick) {
      this.props.onRightClick();
    }
  }

  btnClasses(side) {
    var classes = ['modal-action-btn', side];

    if ((this.props[side] || {}).cancel) {
      classes.push('cancel');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <div className="modal-action-2-btns">
        <div className={this.btnClasses('left')}>
          <button onClick={this.onLeftClick}>{(this.props.left || {}).text || ''}</button>
        </div>
        <div className={this.btnClasses('right')}>
          <button onClick={this.onRightClick}>{(this.props.right || {}).text || ''}</button>
        </div>
      </div>
    );
  }
}

export default ModalAction2Btns;

