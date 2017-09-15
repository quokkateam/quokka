import React, { Component } from 'react';

class ChallengesListItem extends Component {

  constructor(props) {
    super(props);

    var ogChallenge = this.props.challenge || {};

    this.state = {
      slug: ogChallenge.slug,
      name: ogChallenge.name,
      points: ogChallenge.points || 0,
      previewText: ogChallenge.previewText,
      startDate: ogChallenge.startDate,
      endDate: ogChallenge.endDate
    };
  }

  render() {
    return (
      <div className="challenges-list-item">

      </div>
    );
  }
}

export default ChallengesListItem;