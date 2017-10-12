import React, { Component } from 'react';

class Prize extends Component {

  constructor(props) {
    super(props);
    this.prizeClasses = this.prizeClasses.bind(this);
    this.getPrizeEditMask = this.getPrizeEditMask.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  prizeClasses() {
    var classes = ['prize'];

    if (this.props.editable) {
      classes.push('editable');
    }

    return classes.join(' ');
  }

  getPrizeEditMask() {
    if (!this.props.editable) {
      return;
    }

    return <div className="prize-edit-mask">
      <i className="edit-btn fa fa-pencil" onClick={this.onEdit}></i>
      <i className="remove-btn" onClick={this.onRemove}></i>
    </div>;
  }

  onEdit() {
    if (this.props.onEdit) {
      this.props.onEdit(this.props.prize, this.props.sponsor);
    }
  }

  onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.prize);
    }
  }

  render() {
    return (
      <div className={this.prizeClasses()}>
        <img className="sponsor-icon" src={this.props.sponsor.logo} alt=""/>
        <div className="prize-text">{this.props.prize.name}</div>
        <div className="sponsor-name">{this.props.sponsor.name}</div>
        {this.getPrizeEditMask()}
      </div>
    );
  }
}

export default Prize;