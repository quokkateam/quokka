import React from 'react';

const ChallengeSection = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="challenge-card">
          <h2 className="challenge-section-title challenge-card-title">Challenge</h2>
          <div className="challenge-card-title-border center-block"></div>
          <p className="challenge-card-body">
            Take the first day of this week to check out the Harvard School
            of Public Health's <a href="/challenge">Healthy Eating Plate
            Guide</a> on how to make better food decisions. Pick what will be
            an improvement for your health and then stick to it for every day
            this week.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChallengeSection;
