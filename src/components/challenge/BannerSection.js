import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BannerSection extends Component {
  render() {
    return (
      <section id="banner">
        <div className="dimmer"></div>
        <div className="adj-week-nav prev-week">
          <Link className="quokka-nav-button nav-left banner-nav-button" to="/challenge" />
          <span className="adj-challenge-title">{this.props.adjHabits.prev.habit}</span>
        </div>
        <div className="adj-week-nav next-week">
          <Link className="quokka-nav-button nav-right banner-nav-button" to="/challenge" />
          <span className="adj-challenge-title">{this.props.adjHabits.next.habit}</span>
        </div>
        <div className="main-content">
          <img className="habit-icon" src={this.props.habitIcon} alt=""/>
          <div className="habit-name">{this.props.habitName}</div>
          <div className="week-date-info">
            <span className="week-num">Week {this.props.weekNum}</span>&middot;
            <span>{this.props.dates.start}</span>&mdash;<span>{this.props.dates.end}</span>
          </div>
        </div>
      </section>
    );
  }
}

export default BannerSection;