import React, { Component } from 'react';
import HorizSpinner from '../widgets/spinners/horiz-spinner'
import '../../styles/css/auth/signup.css'

class SignUp extends Component {
  render() {
    return (
      // TODO(atn34): Validate that the email has a .edu domain (validate this in API too)
      // TODO(atn34): Check password strength with https://github.com/dropbox/zxcvbn
      <main>
        <section id="signup" ref={this.setSectionRef}>
          <div className="container-fluid">
            <div className="leading-signup-text">Sign up for Quokka</div>
            <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12 signup-field-container" role="email">
                <input type="text" className="signup-field" placeholder="Email" name="email" />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 signup-field-container" role="password">
                <input type="text" className="signup-field" placeholder="Password" name="password" />
                <button className="submit-desktop" data-action="submit-signup"></button>
              </div>
            </div>
            <div className="submit-mobile-container">
              <button className="submit-mobile" data-action="submit-signup">Submit</button>
              <HorizSpinner />
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default SignUp;
