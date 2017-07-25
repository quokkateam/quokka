import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CheckInSection extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Check-In</div>
          <div className="challenge-section-desc">
            Don't forget to submit your Check-in this week by Sunday, {this.props.endDate}!
            Check-ins help you earn Quokka points, provide us with feedback,
            and make you eligible for this week's prizes!&nbsp;
            <Link to="/check-in">Take me to my Week {this.props.weekNum} Check-In.</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckInSection;
