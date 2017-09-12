import React, { Component } from 'react';
import moment from 'moment';

class CheckInSection extends Component {
  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var date = moment('11/05/2017', 'MM/DD/YYYY');

    var dateNum = date.date();

    if (dateNum < 10) {
      dateNum = '0' + dateNum;
    }

    return days[date.day()] + ', ' + months[date.month()] + ' ' + date.date();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Check-In</div>
          <div className="challenge-section-desc">
            Don't forget to submit your check-in this week by {this.formatDate()}!
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
