import React, { Component } from 'react';

import QuokkaMarkdown from '../shared/QuokkaMarkdown';

class GettingStartedSection extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Need help getting started?</div>
          <ul className="suggestions-list">{
            this.props.suggestions.map((suggestion, index) =>
              <li key={index}>
                <QuokkaMarkdown source={suggestion} />
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default GettingStartedSection;
