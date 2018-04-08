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
          <br />
          <center>
            <a href='http://eepurl.com/dqEEqP'> 
              <font color='white'>
                <h3>Joining UCSB&#039;s Challenge? Click here to sign up! </h3>
              </font>
            </a>
          </center>
          <br /><br /><br />
          <SignUp onSubmitSchool={this.props.onSubmitSchool} onSignUp={this.props.onSignUp} />
        </div>
      </section>
    );
  }
}

export default Welcome;