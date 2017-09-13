import React, { Component } from 'react';

import QuokkaMarkdown from '../shared/QuokkaMarkdown';

class ExtrasSection extends Component {
  render() {
    return (
      <div id="extras" className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Extra Info</div>
          <ul className="challenge-section-desc">
            {(this.props.links || []).map((link, index) =>
              (<li key={index}>[{index + 1}]: <a href={link}>{link}</a></li>))
            }
          </ul>
          <QuokkaMarkdown source={this.props.extraInfo || ''}/>
        </div>
      </div>
    );
  }
}

export default ExtrasSection;