import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import ChallengesListItem from './ChallengesListItem';

class ChallengesList extends Component {

  constructor(props) {
    super(props);

    this.getChallenges = this.getChallenges.bind(this);

    this.state = {
      challenges: this.props.challenges || [],
      weekNum: null
    };
  }

  componentDidMount() {
    Ajax.get('/api/challenges')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          challenges: data.challenges,
          weekNum: data.weekNum
        });
      });

    return true;
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