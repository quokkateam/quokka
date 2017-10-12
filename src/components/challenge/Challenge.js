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
    
    this.weekNum = this.props.match.params.weekNum;

    this.setChallengeSectionRef = this.setChallengeSectionRef.bind(this);
    this.setPrizesSectionRef = this.setPrizesSectionRef.bind(this);
    this.setSuggestionsSectionRef = this.setSuggestionsSectionRef.bind(this);
    this.setExtrasSectionRef = this.setExtrasSectionRef.bind(this);
    this.onChallengeSectionUpdate = this.onChallengeSectionUpdate.bind(this);
    this.handleChallengeFetched = this.handleChallengeFetched.bind(this);

    this.state = {
      challengeId: null,
      habit: null,
      adjHabits: null,
      overview: null,
      challenge: null,
      prizes: null,
      sponsors: null,
      suggestions: null,
      links: null,
      extraInfo: null
    };
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

  setExtrasSectionRef(ref) {
    this.extrasSection = ref;
  }

  componentDidUpdate() {
    if (this.state.habit) {
      this.challengeSection.setState({
        challenge: this.state.challenge,
        challengeId: this.state.challengeId
      });

      this.prizesSection.setState({
        challengeId: this.state.challengeId,
        prizes: this.state.prizes,
        sponsors: this.state.sponsors,
        points: this.state.challenge.points || 0
      });

      this.suggestionsSection.setState({
        suggestions: this.state.suggestions,
        challengeId: this.state.challengeId
      });

      this.extrasSection.setState({
        links: this.state.links,
        extraInfo: this.state.extraInfo
      });
    }

    return true;
  }

  componentDidMount() {
    Ajax.get('/api/challenge/' + this.weekNum)
      .then((resp) => {
        this.handleChallengeFetched(resp);
      });
  }

  handleChallengeFetched(resp) {
    if (resp.status === 200 || resp.status === 400) {
      resp.json().then((data) => {
        if (resp.status === 200) {
          this.setState({
            challengeId: Number(data.id),
            habit: data.habit,
            adjHabits: data.adjHabits,
            overview: data.overview,
            challenge: data.challenge,
            prizes: data.prizes,
            sponsors: data.sponsors,
            suggestions: data.suggestions,
            links: data.links,
            extraInfo: data.extraInfo
          });
        } else {
          window.location = '/challenges';
        }
      });
    } else {
      console.warn('Unexpected response code while fetching challenge: ', resp.status);
    }
  }

  onChallengeSectionUpdate(challenge) {
    this.prizesSection.setState({ points: challenge.points || 0 });
  }

  render() {
    return (
      <div>
        <div id="challenge">
          <BannerSection habit={this.state.habit} weekNum={this.weekNum} adjHabits={this.state.adjHabits} />
          <OverviewSection overview={this.state.overview} />
          <ChallengeSection challenge={this.state.challenge} onUpdate={this.onChallengeSectionUpdate} ref={this.setChallengeSectionRef} />
          <PrizesSection prizes={this.state.prizes} sponsors={this.state.sponsors} points={(this.state.challenge || {}).points} ref={this.setPrizesSectionRef} />
          <GettingStartedSection suggestions={this.state.suggestions} ref={this.setSuggestionsSectionRef} />
          <CheckInSection weekNum={this.weekNum} endDate={((this.state.habit || {}).dates || {}).end} />
          <ExtrasSection links={this.state.links} extraInfo={this.state.extraInfo} ref={this.setExtrasSectionRef} />
        </div>
        <InviteFriendsSection />
      </div>
    );
  }
}

export default Challenge;
