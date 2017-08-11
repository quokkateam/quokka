import $ from 'jquery';
import React, { Component } from 'react';

class WeeklyProgBar extends Component {
  
  constructor(props) {
    super(props);
    
    const transitionDur = 1000; // match with weekly-prog-bar.scss at .wpb.front
    this.weeklyTransIntv = transitionDur / this.props.weeks.length;
    
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
  
  easeInOutCubic(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  }
  
  moveToIndex(i) {
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