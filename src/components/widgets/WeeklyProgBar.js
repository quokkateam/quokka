import $ from 'jquery';
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

class WeeklyProgBar extends Component {
  
  constructor(props) {
    super(props);

    this.transitionDur = 1000;

    this.setMovingBarRef = this.setMovingBarRef.bind(this);
    this.setCurrWeekCoverRef = this.setCurrWeekCoverRef.bind(this);
    this.indexClass = this.indexClass.bind(this);
    this.addWeeks = this.addWeeks.bind(this);
    this.moveToIndex = this.moveToIndex.bind(this);
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.moveToIndex(this.props.currentWeekIndex || 0);
    }, 300);

    $(document).resize(() => {
      this.alignCurrWeekCover();
    });
  }
  
  setMovingBarRef(ref) {
    this.movingBar = ref;
  }

  setCurrWeekCoverRef(ref) {
    this.currWeekCover = ref;
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
    var weeklyIndicators = $('.week-indicator');
    var el;

    for (var j = 0; j < weeklyIndicators.length; j++) {
      el = weeklyIndicators[j];

      if (j < i) {
        $(el).addClass('passed show');
      } else if (j > i) {
        $(el).addClass('show');
      }
    }

    $(this.movingBar).addClass('w' + this.indexClass(i));

    setTimeout(() => {
      this.alignCurrWeekCover();
    }, this.transitionDur + 5);
  }

  alignCurrWeekCover() {
    $(this.currWeekCover).css({ left: $(this.movingBar).width() - 12 });
    $(this.currWeekCover).show();
  }

  render() {
    return (
      <div id="weeklyProgBar">
        <div className="wpb back"></div>
        {this.addWeeks()}
        <div className="wpb front" ref={this.setMovingBarRef}></div>
        <div className="curr-week-cover" data-tip data-for="currWeekCover" ref={this.setCurrWeekCoverRef}>
          <ReactTooltip id="currWeekCover" place="bottom" effect="solid">
            <span>{this.props.weeks[this.props.currentWeekIndex]}</span>
          </ReactTooltip>
        </div>
      </div>
    );
  }
}

export default WeeklyProgBar;