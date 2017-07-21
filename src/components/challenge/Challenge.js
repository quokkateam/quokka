import React, { Component } from 'react';
import CheckInSection from './CheckInSection';
import SuggestionsSection  from './SuggestionsSection';
import PrizesSection from './PrizesSection';
import ChallengeSection  from './ChallengeSection';
import OverviewSection from './OverviewSection';

class Challenge extends Component {
  render() {
    return (
      <div id="challenge">
        <OverviewSection/>
        <ChallengeSection/>
        <PrizesSection/>
        <SuggestionsSection/>
        <CheckInSection/>
      </div>
    );
  }
}

export default Challenge;
