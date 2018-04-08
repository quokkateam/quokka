import React, { Component } from 'react';
import SignUp from './SignUp';

class Welcome extends Component {
  render() {
    return (
      <section id="welcome">
        <div className="dimmer"></div>
        <div className="welcome-content">
          <h1 className="welcome-main-text">Welcome to Quokka</h1>
          <p className="welcome-sub-text">Healthier habits for a happier campus</p>
          <br>
          <a href='http://eepurl.com/dqEEqP'> Joining UCSB&#039;s Challenge? Click here to sign up! </a>
          <br>
          <SignUp onSubmitSchool={this.props.onSubmitSchool} onSignUp={this.props.onSignUp} />
        </div>
      </section>
    );
  }
}

export default Welcome;