import React, { Component } from 'react';

class CheckInList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkIns: this.props.checkIns
    };
  }

  render() {
    return (
      <ul className="check-ins-list"></ul>
    );
  }
}

export default CheckInList;