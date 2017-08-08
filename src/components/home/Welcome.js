import React, { Component } from 'react';
import SignUp from './SignUp';

class Welcome extends Component {
  render() {
    return (
      <section id="welcome">
        <div className="dimmer"></div>
        <div className="welcome-content">
          <h1 className="welcome-main-text">Welcome to Quokka</h1>
          <p className="welcome-sub-text">Healthy habits for a happier campus</p>
          <SignUp />
        </div>
      </section>
    );
  }
}

export default Welcome;