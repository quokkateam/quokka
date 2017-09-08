import React from 'react';

import Ajax from '../../utils/Ajax';
import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import { Link } from 'react-router-dom';
import Session from '../../utils/Session';

class SignIn extends Form {

  constructor(props) {
    super(props);

    if (this.props.match.path === '/signout') {
      Session.destroy();
      window.location = '/signin';
    }

    this.setEmailRef = this.setEmailRef.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.submit = this.submit.bind(this);
    this.onSignInResp = this.onSignInResp.bind(this);
  }

  setEmailRef(ref) {
    this.email = ref;
    this.pushFormCompRef(ref);
  }

  submitBtnClasses() {
    var classes = ['submit-form'];

    if (this.state.status === this.status.SENDING) {
      classes.push('loading');
    } else if (this.state.status === this.status.COMPLETE) {
      classes.push('complete');
    }

    return classes;
  }

  componentDidUpdate() {
    if (this.state.status === this.status.SERIALIZING && this.formValid()) {
      this.submit();
    }

    return true;
  }

  submit() {
    this.setState({ status: this.status.SENDING });

    var payload = {};
    ['email', 'password'].forEach((k, i) => {
      payload[k] = this.state.formComps[i];
    });

    Ajax.post('/api/mint_token', payload).then((resp) => {
      this.onSignInResp(resp);
    });
  }

  onSignInResp(resp) {
    switch (resp.status) {
    case 201:
      Session.create(resp);
      window.location = '/';
      break;
    case 401:
      // show invalid credentials message
      this.setState({ status: this.status.STATIC });
      break;
    default:
      console.warn('Unexpected error during signup.');
    }
  }

  render() {
    return (
      <div id="signIn">
        <div className="auth-card">
          <div className="msg-lg">Sign in to Quokka</div>
          <div className="msg-sm">Enter your email and password</div>
          <div className="sign-in-form">
            <FormInput required={true} placeholder='Email' ref={this.setEmailRef}/>
            <FormInput required={true} password={true} placeholder='Password' ref={this.pushFormCompRef}/>
            <LgSpinnerBtn classes={this.submitBtnClasses()} btnText='Sign In' onClick={this.serialize} />
          </div>
          <div className="trailing-links">
            <div className="trailing-link">
              <Link to="/">No account yet? Sign up.</Link>
            </div>
            <div className="trailing-link">
              <Link to="/">I forgot my password</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;