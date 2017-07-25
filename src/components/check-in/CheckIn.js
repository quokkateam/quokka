import React, { Component } from 'react';
import CheckInForm from './CheckInForm'

class CheckIn extends Component {

  constructor(props) {
    super(props);
    this.habitLink = this.habitLink.bind(this);
  }

  habitLink() {
    // Keeping as own method for when we need week number
    return '/challenge';
  }

  render() {
    return (
      <div id="checkIn">
        <div className="check-in-week-info">
          <div className="week-info">Week {this.props.week.num} Check-In: {this.props.week.habitName}</div>
          <div className="check-in-instruc">
            Let us know how this week went and answer some quick questions to make yourself eligible to win
            <a href={this.habitLink()}> this week’s prizes!</a>
          </div>
        </div>
        <CheckInForm formData={this.props.formData} />
      </div>
    );
  }
}

export default CheckIn;