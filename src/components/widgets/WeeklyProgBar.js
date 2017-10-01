import $ from 'jquery';
import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import ReactTooltip from 'react-tooltip';
import Session from '../../utils/Session';

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
    this.getCurrWeekLink = this.getCurrWeekLink.bind(this);
    this.iconClasses = this.iconClasses.bind(this);

    this.state = {
      challenges: [],
      weekNum: null
    };
  }

  componentDidMount() {
    Ajax.get('/api/challenges')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          challenges: data.challenges,
          weekNum: data.weekNum
        });
      });
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

    var classes;
    return challengeNames.map((name, i) => {
      classes = ['week-indicator', 'l' + this.indexClass(i)];
      var weekNum = i + 1;
      var href;

      if (!this.state.weekNum || (weekNum > this.state.weekNum && !Session.isAdmin())) {
        /*eslint-disable no-script-url*/
        href = 'javascript:void(0)';
        classes.push('disabled');
      } else {
        href = '/challenge/week' + weekNum;
      }

      return <a key={i} href={href} data-tip data-for={'l' + i} className={classes.join(' ')}><ReactTooltip id={'l' + i} place="bottom" effect="solid"><span>{name}</span></ReactTooltip></a>;
    });
  }

  moveToIndex(i) {
    var weeklyIndicators = $('.week-indicator');

    $(this.movingBar).addClass('w' + this.indexClass(i));

    var timeout = i === 0 ? 100 : this.transitionDur;

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
    }, timeout);
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

  getCurrWeekLink() {
    if (this.state.weekNum === null) {
      return '#';
    }

    return '/challenge/week' + this.state.weekNum;
  }

  iconClasses() {
    var classes = ['wpb', 'front'];

    if (this.state.challenges) {
      var slugs = this.state.challenges.map((c) => { return c.slug; });
      var slug = slugs[this.state.weekNum - 1];
      classes.push(slug);
    }

    return classes.join(' ');
  }

  render() {
    return (
      <div id="weeklyProgBar">
        <div className="wpb back"></div>
        {this.addWeeks()}
        <div className={this.iconClasses()} ref={this.setMovingBarRef}></div>
        <a href={this.getCurrWeekLink()} className="curr-week-cover" data-tip data-for="currWeekCover" ref={this.setCurrWeekCoverRef}>
          <ReactTooltip id="currWeekCover" place="bottom" effect="solid"><span>{this.getCurrChallengeName()}</span></ReactTooltip>
        </a>
        <div className="party-icon" data-tip data-for="partyIcon">
          <ReactTooltip id="partyIcon" place="bottom" effect="solid"><span>Party!</span></ReactTooltip>
        </div>
      </div>
    );
  }
}

export default WeeklyProgBar;