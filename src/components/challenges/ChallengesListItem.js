import React, { Component } from 'react';
import moment from 'moment';
import Session from '../../utils/Session';

class ChallengesListItem extends Component {

  constructor(props) {
    super(props);

    this.getClasses = this.getClasses.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getLink = this.getLink.bind(this);

    var data = this.props.item || {};

    console.log(data);

    this.state = {
      slug: data.slug,
      name: data.name,
      weekNum: data.weekNum,
      points: data.points || 0,
      previewText: data.previewText,
      startDate: data.startDate,
      endDate: data.endDate,
      currentWeek: data.currentWeek,
      disabled: data.disabled,
      editing: this.props.hasOwnProperty('itemSelected')
    };
  }

  formatDate(when) {
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var date = moment(this.state[when + 'Date'], 'MM/DD/YY');

    return months[date.month()] + ' ' + date.date();
  }

  getClasses() {
    var classes = ['challenges-list-item'];

    if (this.state.editing) {
      classes.push('editing');
    } else {
      if (this.state.currentWeek) {
        classes.push('current');
      } else if (this.state.disabled) {
        classes.push('disabled');
      }
    }

    return classes.join(' ');
  }

  getLink() {
    if (this.state.disabled || this.state.editing) {
      /*eslint-disable no-script-url*/
      return 'javascript:void(0)';
    }

    return '/challenge/week' + this.state.weekNum;
  }

  render() {
    const itemSelected = this.props.itemSelected;
    const dragHandle = this.props.dragHandle;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;

    var icon = this.state.editing ?
      dragHandle(<div className={'ch-icon editing ' + this.state.slug}></div>) :
      <div className={'ch-icon ' + this.state.slug}></div>;

    return (
      <a className={this.getClasses()} href={this.getLink()} style={{ transform: `scale(${scale})`, boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px` }}>
        <div className="ch-icon-container">{icon}</div>
        <div className="ch-desc-container">
          <div className="ch-name">{this.state.name}</div>
          <div className="ch-desc">{this.state.previewText}</div>
        </div>
        <div className="ch-date-points-container">
          <div className="ch-dates">
            <span className="ch-date">{this.formatDate('start')}</span>
            <span className="ch-date-dash">&mdash;</span>
            <span className="ch-date">{this.formatDate('end')}</span>
          </div>
          <div className="ch-points">
            <img src="https://s3-us-west-1.amazonaws.com/quokkadev/images/leaf.png" alt="" />
            <div className="points">{this.state.points}</div>
          </div>
        </div>
      </a>
    );
  }
}

export default ChallengesListItem;