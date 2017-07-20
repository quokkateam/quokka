import React, { Component } from 'react';
import CheckInForm from './CheckInForm'

class CheckIn extends Component {
  
  constructor(props) {
    super(props);
    this.habitLink = this.habitLink.bind(this);
  }
  
  habitLink() {
    return '/week' + this.props.week.num + '/habit';
  }
  
  render() {
    return (
      <div id="checkIn">
        <div className="check-in-week-info">
          <div className="week-info">Week {this.props.week.num} Check-In: {this.props.week.habit}</div>
          <div className="check-in-instruc">
            Let us know how Week {this.props.week.num} went and answer some quick questions to make yourself eligible for
            <a href={this.habitLink()}>this week’s prizes!</a>
          </div>
        </div>
        <CheckInForm formData={this.props.formData} />
      </div>
    );
  }
}

export default CheckIn;