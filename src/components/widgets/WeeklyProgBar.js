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
    this.getCurrChallengeName = this.getCurrChallengeName.bind(this);

    this.state = {
      challenges: [],
      weekNum: null
    };
  }

  componentDidUpdate() {
    if (this.state.challenges) {
      this.moveToIndex(this.state.weekNum - 1);

      $(window).resize(() => {
        this.alignCurrWeekCover();
      });
    }

    return true;
  }
  
  setMovingBarRef(ref) {
    this.movingBar = ref;
  }

  setCurrWeekCoverRef(ref) {
    this.currWeekCover = ref;
  }
  
  indexClass(i) {
    if (this.state.challenges.length === 0) {
      return '';
    }

    return Math.round((i / this.state.challenges.length) * 100);
  }
  
  addWeeks() {
    if (this.state.challenges.length === 0) {
      return;
    }

    var challengeNames = this.state.challenges.map((c) => { return c.name; });
    challengeNames.push('Party');

    var classes;
    return challengeNames.map((name, i) => {
      classes = ['week-indicator', 'l' + this.indexClass(i)];
      return <div key={i} data-tip data-for={'l' + i} className={classes.join(' ')}><ReactTooltip id={'l' + i} place="bottom" effect="solid"><span>{name}</span></ReactTooltip></div>;
    });
  }

  moveToIndex(i) {
    var weeklyIndicators = $('.week-indicator');

    $(this.movingBar).addClass('w' + this.indexClass(i));

    setTimeout(() => {
      var el;
      for (var j = 0; j < weeklyIndicators.length; j++) {
        el = weeklyIndicators[j];

        if (j < i) {
          $(el).addClass('passed show');
        } else if (j > i) {
          $(el).addClass('show');
        }
      }

      this.alignCurrWeekCover();
    }, this.transitionDur);
  }

  alignCurrWeekCover() {
    $(this.currWeekCover).css({ left: $(this.movingBar).width() - 12 });
    $(this.currWeekCover).show();
  }

  getCurrChallengeName() {
    if (this.state.weekNum === null) {
      return;
    }

    return this.state.challenges[this.state.weekNum - 1].name;
  }

  render() {
    return (
      <div id="weeklyProgBar">
        <div className="wpb back"></div>
        {this.addWeeks()}
        <div className="wpb front" ref={this.setMovingBarRef}></div>
        <div className="curr-week-cover" data-tip data-for="currWeekCover" ref={this.setCurrWeekCoverRef}>
          <ReactTooltip id="currWeekCover" place="bottom" effect="solid">
            <span>{this.getCurrChallengeName()}</span>
          </ReactTooltip>
        </div>
      </div>
    );
  }
}

export default WeeklyProgBar;