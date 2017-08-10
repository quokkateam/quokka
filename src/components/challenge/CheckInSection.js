import React, { Component } from 'react';

class CheckInSection extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Check-In</div>
          <div className="challenge-section-desc">
            Don't forget to submit your check-in this week by Sunday, {this.props.endDate}!
            Check-ins help you earn Quokka points, provide us with feedback,
            and make you eligible for this week's prizes!&nbsp;
            <a href={'/check-in/week' + this.props.weekNum}>Take me to my Week {this.props.weekNum} Check-In.</a>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckInSection;
