import React, { Component } from 'react';

const OverviewSection= () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Habit Overview</h2>
          <p className="challenge-section-desc">
            Over the past few weeks, you've been learning a lot about what
            you can do to improve your well-being. This week is an opportunity
            for you to do some research on your own! The focus of this week
            is on how foods can affect how we feel, both physically and
            emotionally. Besides helping you stay in shape, healthy foods can
            help you increase your energy, boost your immune system,
            minimize inflammation, promote muscle building, and more.
            <a href="/challenge"> Learn more about the science behind healthy eating</a>.
          </p>
        </div>
      </div>
  )
}

const ChallengeSection = () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Challenge</h2>
          <p className="challenge-section-desc">Lorem Ipsum</p>
        </div>
      </div>
  )
}

const PrizesSection= () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Prizes</h2>
          <p className="challenge-section-desc">Lorem Ipsum</p>
        </div>
      </div>
  )
}

const SuggestionsSection = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <h2 className="challenge-section-title">Suggestions</h2>
        <p className="challenge-section-desc">
          <b>Need a few ideas or suggestions to help get you started?</b>
          <ul>
            <li>
              Consider eating bigger breakfasts, more protein, greater
                amounts of fiber, or meals with all food groups.
              </li>
            <li>
              Try drinking the full recommended amount of water per day.
              </li>
            <li>
              Look ahead to the <a href="/challenge">online menu</a> to
                pick what you'll eat before you hit the dining hall - you'll
                be more likely to stick to your decision if you know what
                you're eating beforehand.
              </li>
            <li>
              Learn more about the <a href="/challenge">portion sizes </a>
              of Stanford's dishware to become more aware of how much
                you're eating.
              </li>
          </ul>
        </p>
      </div>
    </div>
  )
}

const CheckInSection= () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Check-In</h2>
          <p className="challenge-section-desc">Lorem Ipsum</p>
        </div>
      </div>
  )
}

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
