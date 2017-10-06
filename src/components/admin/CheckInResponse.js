import React, { Component } from 'react';

class CheckInResponse extends Component {

  constructor(props) {
    super(props);
  }

  getClasses() {
    var classes = ['check-in-response'];

    if (this.props.disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  getOverview() {
    if (this.props.disabled) {
      return;
    }

    return (
      <div className="cir-right">
        <a href={'/api/check-ins/responses-' + this.props.challenge.slug + '.csv'} className="cir-dl-link">
          Download Responses
        </a>
        <div className="num-responses">{this.props.overview.respCount} Responses</div>
      </div>
    );
  }

  render() {
    // TODO: Figure out how to download a CSV from link without react-router taking a shit
    return (
      <div className={this.getClasses()}>
        <div className="cir-left">
          <div className="challenge-name">{this.props.challenge.name}</div>
        </div>
        {this.getOverview()}
      </div>
    );
  }
}

export default CheckInResponse;