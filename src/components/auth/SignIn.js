import React from 'react';

import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import { Link } from 'react-router-dom';
import StatusCodes from '../../utils/StatusCodes';

class SignIn extends Form {

  constructor(props) {
    super(props);
    this.setEmailRef = this.setEmailRef.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.submit = this.submit.bind(this);
    this.onSignInResp = this.onSignInResp.bind(this);
    this.onSignInError = this.onSignInError.bind(this);
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
    if (this.state.status === this.state.SERIALIZING) {
      this.onSerializing();
    }

    return true;
  }

  onSerializing() {
    if (this.formValid()) {
      this.submit();
    }
  }

  submit() {
    this.setState({ status: this.status.SENDING });

    var payload = {};
    ['email', 'password'].forEach((k, i) => {
      payload[k] = this.state.formComps[i];
    });

    // Ajax.post('/api/users/signin', payload).then((resp) => {
    //   this.onSignInResp(resp);
    // });
  }

  onSignInResp(resp) {
    switch (resp.status) {
    case 201:
      this.setState({ status: this.status.COMPLETE });
      break;
    case 400:
      resp.json().then((data) => {
        this.onSignInError(data);
      });
      break;
    default:
      console.warn('Unexpected error during signup.');
    }
  }

  onSignInError(data) {
    switch (data.error) {
    // TODO: handle case where creds are just plain wrong
    // case StatusCodes.INVALID_EMAIL_DOMAIN:
    //   this.onInvalidEmailDomain();
    //   break;
    case StatusCodes.INVALID_EMAIL_FORMAT:
      this.email.showInvalidEmail();
      this.setState({ status: this.status.STATIC });
      break;
    default:
      // Nothing
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
            <FormInput required={true} placeholder='Password' ref={this.pushFormCompRef}/>
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