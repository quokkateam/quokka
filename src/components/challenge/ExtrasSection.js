import React, { Component } from 'react';

import QuokkaMarkdown from '../shared/QuokkaMarkdown';

class ExtrasSection extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Extra Info</div>
          <ul>
            {this.props.links.map((link, index) =>
              (<li key={index}>[{index}]: <a href={link}>{link}</a></li>))
            }
          </ul>
          <QuokkaMarkdown source={
` [If circumstances prevent you from fulfilling our outlined challenges,
mind-body exercises may be helpful alternatives to managing a variety of
health conditions such as anxiety, insomnia, or other chronic pain
symptoms](https://nccih.nih.gov/health/stress/relaxation.htm).

The information on this site is for general purposes only and is not
intended or implied to be a substitute for professional medical advice,
diagnosis, or treatment. Seek advice from your health care provider for
your personal health needs.`}
          />
        </div>
      </div>
    );
  }
}

export default ExtrasSection;