import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import BannerSection from './BannerSection';
import ChallengeSection  from './ChallengeSection';
import CheckInSection from './CheckInSection';
import ExtrasSection from './ExtrasSection';
import GettingStartedSection  from './GettingStartedSection';
import InviteFriendsSection from './InviteFriendsSection';
import OverviewSection from './OverviewSection';
import PrizesSection from './PrizesSection';

class Challenge extends Component {

  constructor(props) {
    super(props);
    
    // use for fetching week info from DB
    this.weekNum = this.props.match.params.weekNum;

    this.setChallengeSectionRef = this.setChallengeSectionRef.bind(this);
    this.setPrizesSectionRef = this.setPrizesSectionRef.bind(this);
    this.setSuggestionsSectionRef = this.setSuggestionsSectionRef.bind(this);

    this.state = {
      habit: null,
      adjHabits: null,
      overview: null,
      challenge: null,
      prizes: null,
      suggestions: null,
      links: null
    };

    // const formatLink = (i) => `[[${i}]](${links[i - 1]})`;
  }

  setChallengeSectionRef(ref) {
    this.challengeSection = ref;
  }

  setPrizesSectionRef(ref) {
    this.prizesSection = ref;
  }

  setSuggestionsSectionRef(ref) {
    this.suggestionsSection = ref;
  }

  componentDidUpdate() {
    if (this.state.habit) {
      this.challengeSection.setState({ challenge: this.state.challenge });
      this.prizesSection.setState({ prizes: this.state.prizes });
      this.suggestionsSection.setState({ suggestions: this.state.suggestions });
    }

    return true;
  }

  componentDidMount() {
    Ajax.get('/api/challenge/' + this.weekNum)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          habit: data.habit,
          adjHabits: data.adjHabits,
          overview: data.overview,
          challenge: data.challenge,
          prizes: data.prizes,
          suggestions: data.suggestions,
          links: data.links
        });
      });
  }

  render() {
    return (
      <div>
        <div id="challenge">
          <BannerSection habit={this.state.habit} weekNum={this.weekNum} adjHabits={this.state.adjHabits} />
          <OverviewSection overview={this.state.overview} />
          <ChallengeSection challenge={this.state.challenge} ref={this.setChallengeSectionRef} />
          <PrizesSection prizes={this.state.prizes} points={(this.state.challenge || {}).points} ref={this.setPrizesSectionRef} />
          <GettingStartedSection suggestions={this.state.suggestions} ref={this.setSuggestionsSectionRef} />
          <CheckInSection weekNum={this.weekNum} endDate={((this.state.habit || {}).dates || {}).end} />
          <ExtrasSection links={this.state.links} />
        </div>
        <InviteFriendsSection />
      </div>
    );
  }
}

export default Challenge;
