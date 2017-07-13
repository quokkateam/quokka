import React, { Component } from 'react';

class Welcome extends Component {
	render() {
		return (
			<section id="welcome">
				<div className="dimmer"></div>
        <div className="welcome-content">
          <h1 className="welcome-main-text">Welcome to Quokka</h1>
          <p className="welcome-sub-text">Healthy habits for a happier campus</p>
          <button className="primary-request-btn" data-action="request-to-join">Join the Challenge</button>
        </div>
			</section>
		);
	}
}

export default Welcome;