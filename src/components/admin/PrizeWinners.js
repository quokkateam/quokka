import React, { Component } from 'react';

class PrizeWinners extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // fetch all prize winners and update PrizeWinnersList
    return true;
  }

  render() {
    return (
      <div id="prizeWinners">
        Prize Winners
      </div>
    );
  }
}

export default PrizeWinners;