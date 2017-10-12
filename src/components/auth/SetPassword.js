import React from 'react';

import $ from 'jquery';
import Ajax from '../../utils/Ajax';
import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import FormSelect from '../shared/form/FormSelect';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import Session from '../../utils/Session';

class SetPassword extends Form {

  constructor(props) {
    super(props);

    // show Dorm dropdown for students to select from?
    this.showDorm = !!document.location.search.match(/from_verify=true/i) &&
      (Session.school() || {}).slug === 'rice-university';

    this.setInvalidMsgRef = this.setInvalidMsgRef.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.formatDormOptions = this.formatDormOptions.bind(this);
    this.getDormInput = this.getDormInput.bind(this);
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
    var payload = { password: this.state.formComps[0] };

    if (this.showDorm) {
      payload.dorm = this.state.formComps[2];
    }

    Ajax.put('/api/update_password', payload)
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

  formatDormOptions() {
    var dorms = [
      'Baker',
      'Brown',
      'Duncan',
      'Hanszen',
      'Jones',
      'Lovett',
      'Martel',
      'McMurtry',
      'Sid Richardson',
      'Wiess',
      'Will Rice'
    ];

    return dorms.map((d) => {
      return { value: d, title: d };
    });
  }

  getDormInput() {
    if (!this.showDorm) {
      return;
    }

    return <FormSelect required={true} placeholder='Dorm' options={this.formatDormOptions()} ref={this.pushFormCompRef}/>;
  }

  render() {
    return (
      <div id="setPassword">
        <div className="auth-card">
          <div className="msg-lg">Set your Quokka password</div>
          <div className="sign-in-form">
            <FormInput required={true} password={true} placeholder='Password' onKeyUp={this.hideInvalidMessage} ref={this.pushFormCompRef}/>
            <FormInput required={true} password={true} placeholder='Re-enter password' onKeyUp={this.onLastInputKeyUp} ref={this.pushFormCompRef}/>
            {this.getDormInput()}
            <div className="invalid-msg" ref={this.setInvalidMsgRef}>Passwords don't match.</div>
            <LgSpinnerBtn classes={this.submitBtnClasses()} btnText='Update Password' onClick={this.serialize}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SetPassword;