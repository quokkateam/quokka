import React, { Component } from 'react';
import moment from 'moment';
import Session from '../../utils/Session';

class ChallengesListItem extends Component {

  constructor(props) {
    super(props);

    this.getClasses = this.getClasses.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getLink = this.getLink.bind(this);

    var ch = this.props.challenge || {};

    this.state = {
      slug: ch.slug,
      name: ch.name,
      points: ch.points || 0,
      previewText: ch.previewText,
      startDate: ch.startDate,
      endDate: ch.endDate,
      weekNum: this.props.weekNum
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

    if (this.state.weekNum === this.props.currWeekNum) {
      classes.push('current');
    } else if (this.state.weekNum > this.props.currWeekNum && !Session.isAdmin()) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  getLink() {
    if (this.state.weekNum > this.props.currWeekNum && !Session.isAdmin()) {
      /*eslint-disable no-script-url*/
      return 'javascript:void(0)';
    }

    return '/challenge/week' + this.state.weekNum;
  }

  render() {
    return (
      <a className={this.getClasses()} href={this.getLink()}>
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