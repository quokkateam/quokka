import $ from 'jquery';
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class WeeklyProgBar extends Component {
  
  constructor(props) {
    super(props);
    
    this.transitionDur = 1000; // match with weekly-prog-bar.scss at .wpb.front

    this.setMovingBarRef = this.setMovingBarRef.bind(this);
    this.indexClass = this.indexClass.bind(this);
    this.addWeeks = this.addWeeks.bind(this);
    this.moveToIndex = this.moveToIndex.bind(this);
    this.createCurrWeekCover = this.createCurrWeekCover.bind(this);
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.moveToIndex(this.props.currentWeekIndex || 0);
    }, 300);
  }
  
  setMovingBarRef(ref) {
    this.movingBar = ref;
  }
  
  indexClass(i) {
    return Math.round((i / this.props.weeks.length) * 100);
  }
  
  addWeeks() {
    var classes;
    var weeks = [];
    
    this.props.weeks.forEach((name) => {
      weeks.push(name);
    });
    
    weeks.push('Party');

    return weeks.map((name, i) => {
      classes = ['week-indicator', 'l' + this.indexClass(i)].join(' ');
      return <div key={i} data-tip data-for={'l' + i} className={classes}><ReactTooltip id={'l' + i} place="bottom" effect="solid"><span>{name}</span></ReactTooltip></div>;
    });
  }

  moveToIndex(i) {
    this.passIntervalAtIndex(0);

    // currently for 3 movements
    // TODO: add function or hardcoded map of interval times
    setTimeout(() => {
      this.passIntervalAtIndex(1);
    }, 0.2 * this.transitionDur);
    
    setTimeout(() => {
      this.passIntervalAtIndex(2);
    }, 0.3 * this.transitionDur);

    $(this.movingBar).addClass('w' + this.indexClass(i));

    var weeklyIndicators = $('.week-indicator');

    weeklyIndicators.splice(i, 1); // ignore current week
    weeklyIndicators.splice(7, 1); // ignore party week

    setTimeout(() => {
      for (var i = 0; i < weeklyIndicators.length; i++) {
        $(weeklyIndicators[i]).css('z-index', 3);
      }

      this.createCurrWeekCover();
    }, 1005);
  }

  createCurrWeekCover() {
    var cover = document.createElement('div');
    cover.className = 'curr-week-cover';

    $(cover).hover(() => {
      $('[data-for="l3"]').mouseover();
    }, () => {

    });

    $(this.movingBar).append(cover);
  }
  
  passIntervalAtIndex(i) {
    $('.week-indicator.l' + this.indexClass(i)).addClass('passed');
  }
  
  render() {
    return (
      <div id="weeklyProgBar">
        <div className="wpb back"></div>
        {this.addWeeks()}
        <div className="wpb front" ref={this.setMovingBarRef}></div>
      </div>
    );
  }
}

export default WeeklyProgBar;