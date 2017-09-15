import React, { Component } from 'react';

import ChallengesList from './ChallengesList';
import CheckInList from './CheckInList';
import HashNavContainer from '../shared/hash-nav/HashNavContainer';
import WeeklyProgBar from '../widgets/WeeklyProgBar';

class Challenges extends Component {
  
  constructor(props) {
    super(props);

    this.links = [
      {
        hash: 'challenges',
        title: 'Challenges',
        comp: <ChallengesList/>
      },
      {
        hash: 'check-ins',
        title: 'Check-ins',
        comp: <CheckInList/>
      }
    ];
  }

  render() {
    return (
      <div id="challenges">
        <div className="prog-bar-wrapper">
          <WeeklyProgBar/>
        </div>
        <HashNavContainer links={this.links}/>
      </div>
    );
  }
}

export default Challenges;