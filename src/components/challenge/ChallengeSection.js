import React, { Component } from 'react';

import QuokkaMarkdown from '../shared/QuokkaMarkdown';

class ChallengeSection extends Component {
  render() {
    return (
      <div className="container-fluid challenge-card">
        <div className="row">
          <div className="challenge-card-header">
            <div className="challenge-section-title">Challenge</div>
            <div className="points">
              <img src="https://s3-us-west-1.amazonaws.com/quokkadev/images/leaf.png" alt="" />
              <span className="point-count">{this.props.challenge.points}</span>
            </div>
          </div>
          <div className="challenge-card-body"><QuokkaMarkdown source={this.props.challenge.text} /></div>
        </div>
      </div>
    );
  }
}

export default ChallengeSection;