import $ from 'jquery';
import React, { Component } from 'react';

class WeeklyProgBar extends Component {
  
  constructor(props) {
    super(props);
    
    this.transitionDur = 1000; // match with weekly-prog-bar.scss at .wpb.front
    
    this.setMovingBarRef = this.setMovingBarRef.bind(this);
    this.indexClass = this.indexClass.bind(this);
    this.addWeeks = this.addWeeks.bind(this);
    this.moveToIndex = this.moveToIndex.bind(this);
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
      classes = ['week-indicator', 'l' + this.indexClass(i)];
      return <div key={i} className={classes.join(' ')}></div>;
    });
  }

  moveToIndex(i) {
    this.passIntervalAtIndex(0);
    
    // currently for 3 movements
    // TODO: add function or hardcoded map of interval times
    setTimeout(() => {
      this.passIntervalAtIndex(1);
    }, 0.1 * this.transitionDur);
    
    setTimeout(() => {
      this.passIntervalAtIndex(2);
    }, 0.25 * this.transitionDur);
    
    setTimeout(() => {
      this.passIntervalAtIndex(i);
    }, 0.99 * this.transitionDur);
    
    $(this.movingBar).addClass('w' + this.indexClass(i));
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