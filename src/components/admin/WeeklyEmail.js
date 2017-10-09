import React, { Component } from 'react';

class WeeklyEmail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || {}
    };
  }

  render() {
    return (
      <div className="weekly-email">
      </div>
    );
  }
}

export default WeeklyEmail;