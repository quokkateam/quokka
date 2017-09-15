import React, { Component } from 'react';
import moment from 'moment';

class ChallengesListItem extends Component {

  constructor(props) {
    super(props);

    this.getClasses = this.getClasses.bind(this);
    this.formatDate = this.formatDate.bind(this);

    var ogChallenge = this.props.challenge || {};

    this.state = {
      slug: ogChallenge.slug,
      name: ogChallenge.name,
      points: ogChallenge.points || 0,
      previewText: ogChallenge.previewText,
      startDate: ogChallenge.startDate,
      endDate: ogChallenge.endDate,
      index: this.props.index
    };
  }

  formatDate(when) {
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var date = moment(this.state[when + 'Date'], 'MM/DD/YY');

    return months[date.month()] + ' ' + date.date();
  }

  getClasses() {
    var classes = ['challenges-list-item'];

    if (this.props.currWeek) {
      classes.push('current');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <a className={this.getClasses()} href={'/challenge/week' + (this.state.index + 1)}>
        <div className="ch-icon-container">
          <div className={'ch-icon ' + this.state.slug}></div>
        </div>
        <div className="ch-desc-container">
          <div className="ch-name">{this.state.name}</div>
          <div className="ch-desc">{this.state.previewText}</div>
        </div>
        <div className="ch-date-points-container">
          <div className="ch-dates">
            <span className="ch-date">{this.formatDate('start')}</span>
            <span className="ch-date-dash">&mdash;</span>
            <span className="ch-date">{this.formatDate('end')}</span>
          </div>
          <div className="ch-points">
            <img src="https://s3-us-west-1.amazonaws.com/quokkadev/images/leaf.png" alt="" />
            <div className="points">{this.state.points}</div>
          </div>
        </div>
      </a>
    );
  }
}

export default ChallengesListItem;