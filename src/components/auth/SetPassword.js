import React, { Component } from 'react';

import $ from 'jquery';
import Ajax from '../../utils/Ajax';
import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import Session from '../../utils/Session';

class SetPassword extends Form {

  constructor(props) {
    super(props);

    this.setInvalidMsgRef = this.setInvalidMsgRef.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.submit = this.submit.bind(this);
    this.hideInvalidMessage = this.hideInvalidMessage.bind(this);
    this.onLastInputKeyUp = this.onLastInputKeyUp.bind(this);
  }

  setInvalidMsgRef(ref) {
    this.invalidMsg = ref;
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

  formValid() {
    var isValid = true;

    this.formCompRefs.forEach((formComp) => {
      if (!formComp.isValid()) {
        isValid = false;
      }
    });

    if (!isValid) {
      return false;
    }

    var password = this.state.formComps[0];
    var passwordConf = this.state.formComps[1];

    if (password !== passwordConf) {
      $(this.invalidMsg).show();
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    if (this.state.status === this.status.SERIALIZING && this.formValid()) {
      this.submit();
    }

    return true;
  }

  submit() {
    this.setState({ status: this.status.SENDING });
    var password = this.state.formComps[0];

    Ajax.put('/api/update_password', { password: password })
      .then((resp) => {
        if (resp.status === 200) {
          Session.create(resp, () => {
            window.location = '/challenges';
          });
        }
      });
  }

  hideInvalidMessage() {
    $(this.invalidMsg).hide();
  }

  onLastInputKeyUp(_, e) {
    this.hideInvalidMessage();

    if (e.which === 13) { // Enter
      this.serialize();
    }
  }

  render() {
    return (
      <div id="setPassword">
        <div className="auth-card">
          <div className="msg-lg">Set your Quokka password</div>
          <div className="sign-in-form">
            <FormInput required={true} password={true} placeholder='Password' onKeyUp={this.hideInvalidMessage} ref={this.pushFormCompRef}/>
            <FormInput required={true} password={true} placeholder='Re-enter password' onKeyUp={this.onLastInputKeyUp} ref={this.pushFormCompRef}/>
            <div className="invalid-msg" ref={this.setInvalidMsgRef}>Passwords don't match.</div>
            <LgSpinnerBtn classes={this.submitBtnClasses()} btnText='Update Password' onClick={this.serialize}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SetPassword;