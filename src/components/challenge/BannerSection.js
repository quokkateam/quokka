import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    return <Link to={'/challenge/week' + this.props.adjHabits.prev.weekNum}>
      <div className="quokka-nav-button nav-left banner-nav-button"></div>
      <span className="adj-challenge-title">{this.props.adjHabits.prev.name}</span>
    </Link>;
  }

  nextWeek() {
    if (!this.props.adjHabits || !this.props.adjHabits.next) {
      return;
    }

    return <Link to={'/challenge/week' + this.props.adjHabits.next.weekNum}>
      <div className="quokka-nav-button nav-right banner-nav-button"></div>
      <span className="adj-challenge-title">{this.props.adjHabits.next.name}</span>
    </Link>;
  }

  weekNum() {
    if (!this.props.habit) {
      return;
    }

    return 'Week ' + this.props.weekNum;
  }

  getDate(when) {
    if (!this.props.habit || !this.props.habit.dates) {
      return;
    }

    return this.props.habit.dates[when];
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