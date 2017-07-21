import React, { Component } from 'react';
import CheckInSection from './CheckInSection';
import SuggestionsSection  from './SuggestionsSection';
import PrizesSection from './PrizesSection';
import ChallengeSection  from './ChallengeSection';
import OverviewSection from './OverviewSection';

const Banner = () => {
  return (
    <section id="banner">
      <div className="dimmer"></div>
      <div className="banner-content">
        <img className="icon center-block chef-hat" src="https://s3-us-west-1.amazonaws.com/quokkadev/images/healthy_eating_green.png" alt="" />
        <h1 className="banner-main-text">Healthy Eating</h1>
        <p className="banner-sub-text">Week 4 &#x2022; Sept 11 - Sept 17</p>
      </div>
    </section>
  )
}
class Challenge extends Component {
  render() {
    return (
      <div>
        <Banner />
        <div id="challenge">
          <OverviewSection/>
          <ChallengeSection/>
          <PrizesSection/>
          <SuggestionsSection/>
          <CheckInSection/>
        </div>
      </div>
    );
  }
}

export default Challenge;
