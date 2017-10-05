import React, { Component } from 'react';

class CheckInsListItem extends Component {

  constructor(props) {
    super(props);

    this.getLink = this.getLink.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.getStatusIcon = this.getStatusIcon.bind(this);
    this.getFractionComplete = this.getFractionComplete.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getProgressClasses = this.getProgressClasses.bind(this);
  }

  getLink() {
    /*eslint-disable no-script-url*/
    if (this.props.disabled) {
      return 'javascript:void(0)';
    }

    return '/check-in/week' + this.props.weekNum;
  }

  getClasses() {
    var classes = ['ch-list-item', 'check-in'];

    if (this.props.disabled) {
      classes.push('disabled');
    } else if (this.props.current) {
      classes.push('current');
    }

    return classes.join(' ');
  }

  getStatusIcon(data) {
    if (data.numAnswers === data.numQuestions && data.numQuestions > 0) {
      return <div className="ch-status-icon"></div>;
    }
  }

  getFractionComplete(data) {
    if (!data.numQuestions || (data.numAnswers === data.numQuestions && data.numQuestions > 0)) {
      return;
    }

    return data.numAnswers + '/' + data.numQuestions;
  }

  getStatus(data) {
    if (!data.numQuestions) {
      return;
    }

    if (data.numAnswers === 0) {
      return 'Incomplete';
    }

    return data.numAnswers === data.numQuestions ? 'Complete' : 'In Progress';
  }

  getProgressClasses(data) {
    var classes = ['ch-progress'];

    if (data.numQuestions > 0 && data.numAnswers === 0) {
      classes.push('incomplete');
    } else if (data.numQuestions > 0 && data.numAnswers > 0 && data.numAnswers !== data.numQuestions) {
      classes.push('in-progress');
    } else if (data.numQuestions > 0 && data.numAnswers === data.numQuestions) {
      classes.push('complete');
    }

    return classes.join(' ');
  }

  render() {
    const checkIn = this.props.checkIn || {};

    return (
      <a className={this.getClasses()} href={this.getLink()}>
        <div className="ch-icon-container">
          <div className="ch-icon"></div>
        </div>
        <div className="ch-desc-container">
          <div className="ch-name">Check-in &mdash; {checkIn.challengeName}</div>
        </div>
        <div className={this.getProgressClasses(checkIn)}>
          {this.getStatusIcon(checkIn)}
          <div className="ch-fraction-complete">{this.getFractionComplete(checkIn)}</div>
          <div className="ch-status">{this.getStatus(checkIn)}</div>
        </div>
      </a>
    );
  }
}

export default CheckInsListItem;