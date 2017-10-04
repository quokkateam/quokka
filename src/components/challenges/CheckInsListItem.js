import React, { Component } from 'react';

class CheckInsListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const checkIn = this.props.checkIn || {};

    return (
      <a className="check-ins-list-item" href={'/check-in/week' + this.props.weekNum}>
        <div>{checkIn.challengeName}</div>
        <div>{checkIn.numAnswers + '/' + checkIn.numQuestions}</div>
      </a>
    );
  }
}

export default CheckInsListItem;