import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import CheckInResponse from './CheckInResponse';

class CheckInResponses extends Component {

  constructor(props) {
    super(props);

    this.populateWeeks = this.populateWeeks.bind(this);

    this.state = {
      weeklyResponses: this.props.weeklyResponses || [],
      launched: false,
      weekNum: null
    };
  }

  componentDidMount() {
    Ajax.get('/api/check_ins/response_overviews')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(data);
      });

    return true;
  }

  populateWeeks() {
    var disabled;

    return this.state.weeklyResponses.map((data, i) => {
      if (!this.state.launched) {
        disabled = true;
      } else {
        disabled = (i + 1) > this.state.weekNum;
      }

      return <CheckInResponse key={i} challenge={data.challenge} overview={data.overview} disabled={disabled}/>;
    });
  }

  render() {
    return (
      <div id="checkInResponses">
        <div className="check-in-responses-intro">
          <div className="check-in-responses-title">Check-in Responses</div>
          <div className="check-in-responses-subtitle">Download CSVs of anonymized check-in responses for each weekly challenge.</div>
        </div>
        <ul className="check-in-responses-list">{this.populateWeeks()}</ul>
      </div>
    );
  }
}

export default CheckInResponses;