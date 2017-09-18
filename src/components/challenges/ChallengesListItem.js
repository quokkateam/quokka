import React, { Component } from 'react';
import moment from 'moment';

class ChallengesListItem extends Component {

  constructor(props) {
    super(props);

    this.getClasses = this.getClasses.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getLink = this.getLink.bind(this);
    this.isEditing = this.isEditing.bind(this);
  }

  formatDate(dateStr) {
    if (!dateStr) {
      return;
    }

    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    var date = moment(dateStr, 'MM/DD/YY');

    return months[date.month()] + ' ' + date.date();
  }

  isEditing() {
    return this.props.hasOwnProperty('itemSelected');
  }

  getClasses(data) {
    var classes = ['challenges-list-item'];

    if (this.isEditing()) {
      classes.push('editing');
    } else {
      if (data.currentWeek) {
        classes.push('current');
      } else if (data.disabled) {
        classes.push('disabled');
      }
    }

    return classes.join(' ');
  }

  getLink(data) {
    if (data.disabled || this.isEditing()) {
      /*eslint-disable no-script-url*/
      return 'javascript:void(0)';
    }

    return '/challenge/week' + data.weekNum;
  }

  render() {
    const itemSelected = this.props.itemSelected;
    const dragHandle = this.props.dragHandle;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    var data = this.props.item || {};
    var icon = this.isEditing() ?
      dragHandle(<div className={'ch-icon editing ' + data.slug}></div>) :
      <div className={'ch-icon ' + data.slug}></div>;

    return (
      <a className={this.getClasses(data)} href={this.getLink(data)} style={{ transform: `scale(${scale})`, boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px` }}>
        <div className="ch-icon-container">{icon}</div>
        <div className="ch-desc-container">
          <div className="ch-name">{data.name}</div>
          <div className="ch-desc">{data.previewText}</div>
        </div>
        <div className="ch-date-points-container">
          <div className="ch-dates">
            <span className="ch-date">{this.formatDate(data.startDate)}</span>
            <span className="ch-date-dash">&mdash;</span>
            <span className="ch-date">{this.formatDate(data.endDate)}</span>
          </div>
          <div className="ch-points">
            <img src="https://s3-us-west-1.amazonaws.com/quokkadev/images/leaf.png" alt="" />
            <div className="points">{data.points}</div>
          </div>
        </div>
      </a>
    );
  }
}

export default ChallengesListItem;