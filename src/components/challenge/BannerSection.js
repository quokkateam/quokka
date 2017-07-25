import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BannerSection extends Component {
  render() {
    return (
      <div id="banner">
        <div className="dimmer"></div>
        <div className="adj-week-nav prev-week">
          <Link to="/challenge">
            <div className="quokka-nav-button nav-left banner-nav-button"></div>
            <span className="adj-challenge-title">{this.props.adjHabits.prev.habit}</span>
          </Link>
        </div>
        <div className="adj-week-nav next-week">
          <Link to="/challenge">
            <div className="quokka-nav-button nav-right banner-nav-button"></div>
            <span className="adj-challenge-title">{this.props.adjHabits.next.habit}</span>
          </Link>
        </div>
        <div className="main-content">
          <img className="habit-icon" src={this.props.habitIcon} alt=""/>
          <div className="habit-name">{this.props.habit}</div>
          <div className="week-date-info">
            <span>Week {this.props.weekNum}</span>&middot;
            <span>{this.props.dates.start}</span>&mdash;
            <span>{this.props.dates.end}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerSection;