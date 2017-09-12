import React, { Component } from 'react';
import moment from 'moment';

class BannerSection extends Component {

  constructor(props) {
    super(props);
    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.weekNum = this.weekNum.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  prevWeek() {
    if (!this.props.adjHabits || !this.props.adjHabits.prev) {
      return;
    }

    return <a href={'/challenge/week' + this.props.adjHabits.prev.weekNum}>
      <div className="quokka-nav-button nav-left banner-nav-button"></div>
      <span className="adj-challenge-title">{this.props.adjHabits.prev.name}</span>
    </a>;
  }

  nextWeek() {
    if (!this.props.adjHabits || !this.props.adjHabits.next) {
      return;
    }

    return <a href={'/challenge/week' + this.props.adjHabits.next.weekNum}>
      <div className="quokka-nav-button nav-right banner-nav-button"></div>
      <span className="adj-challenge-title">{this.props.adjHabits.next.name}</span>
    </a>;
  }

  weekNum() {
    if (!this.props.habit) {
      return;
    }

    return 'Week ' + this.props.weekNum;
  }

  getDate(when) {
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    if (!this.props.habit || !this.props.habit.dates) {
      return;
    }

    var date = moment(this.props.habit.dates[when], 'MM/DD/YYYY');
    var month = months[date.month()];
    var day = date.date();

    if (day < 10) {
      day = '0' + day;
    }

    return month + ' ' + day;
  }

  render() {
    return (
      <div id="challengeBanner">
        <div className="dimmer"></div>
        <div className="adj-week-nav prev-week">{this.prevWeek()}</div>
        <div className="adj-week-nav next-week">{this.nextWeek()}</div>
        <div className="main-content">
          <img className="habit-icon" src={(this.props.habit || {}).icon || ''} alt=""/>
          <div className="habit-name">{(this.props.habit || {}).name || ''}</div>
          <div className="week-date-info">
            <span>{this.weekNum()}</span>&middot;
            <span>{this.getDate('start')}</span>&mdash;
            <span>{this.getDate('end')}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerSection;