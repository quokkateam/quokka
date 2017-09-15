import React, { Component } from 'react';

import ChallengesListItem from './ChallengesListItem';

class ChallengesList extends Component {

  constructor(props) {
    super(props);

    this.getChallenges = this.getChallenges.bind(this);

    this.state = {
      challenges: this.props.challenges || []
    };
  }

  getChallenges() {
    return this.state.challenges.map((c) => {
      return <li className="challenge-list-item-wrapper" key={c.slug}>
        <ChallengesListItem challenge={c}/>
      </li>;
    });
  }

  render() {
    return (
      <ul className="challenges-list">{this.getChallenges()}</ul>
    );
  }
}

export default ChallengesList;