import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import EmailInput from '../shared/form/EmailInput';
import FormSelect from '../shared/form/FormSelect';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import React from 'react';
import Session from '../../utils/Session';
import StatusCodes from '../../utils/StatusCodes'

const SUCCESS_MESSAGE_DURATION = 3000;

class SignUp extends Form {
  constructor(props) {
    super(props);
    
    // will be accessible from server response as response.schools
    // will also need to send uuids for schools if not using slugs
    this.schools = [
      {
        value: 'emory',
        title: 'Emory University',
        domains: [
          'emory'
        ]
      },
      {
        value: 'notre-dame',
        title: 'University of Notre Dame',
        domains: [
          'nd'
        ]
      },
      {
        value: 'stanford',
        title: 'Stanford University',
        domains: [
          'stanford'
        ]
      },
      {
        value: 'vanderbilt',
        title: 'Vanderbilt University',
        domains: [
          'vanderbilt',
          'vandy'
        ]
      }
    ];
    
    this.setEmailRef = this.setEmailRef.bind(this);
    this.setSchoolRef = this.setSchoolRef.bind(this);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.submit = this.submit.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.submitBtnContent = this.submitBtnContent.bind(this);
    this.onEmailKeyUp = this.onEmailKeyUp.bind(this);
    this.createDomainRegex = this.createDomainRegex.bind(this);
    this.onEmailUnavailable = this.onEmailUnavailable.bind(this);
    this.onSignUpResp = this.onSignUpResp.bind(this);
    
    this.createDomainRegex();
  }
  
  setEmailRef(ref) {
    this.email = ref;
    this.pushFormCompRef(ref);
  }
  
  setSchoolRef(ref) {
    this.school = ref;
    this.pushFormCompRef(ref);
  }
  
  createDomainRegex() {
    this.domain2school = {};
    
    this.schools.forEach((school) => {
      (school.domains || []).forEach((domain) => {
        this.domain2school[domain] = school.value;
      });
    });
    
    this.domainRegex = new RegExp('@(' + Object.keys(this.domain2school).join('|') + ')', 'i');
  }

  componentDidUpdate() {
    // Set up handlers for when our component changes state
    switch (this.state.status) {
    case this.status.SERIALIZING:
      this.onSerializing();
      break;
    case this.status.COMPLETE:
      this.onComplete();
      break;
    case this.status.SENDING:
      // Do nothing.
      break;
    case this.status.STATIC:
      // Do nothing.
      break;
    default:
      console.warn('Unexpected status case');
      break;
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

    // TODO: remove this code when we're actually talking to an API.
    setTimeout(() => {
      this.setState({ status: this.status.COMPLETE });
    }, 300);

    // TODO: uncomment this code when we're actually talking to an API.
    // var payload = {};
    // ['email', 'name', 'school'].forEach((k, i) => {
    //   payload[k] = this.state.formComps[i];
    // });
    //
    // axios.post('/users', payload).then((resp) => {
    //   this.onSignUpResp(resp);
    // });
  }
  
  onSignUpResp(resp) {
    switch (resp.status) {
    case 200:
      // Create a new session for the user
      Session.create(resp);
      this.setState({ status: this.status.COMPLETE });
      break;
    case StatusCodes.EMAIL_UNAVAILABLE:
      // Email is taken. Let the user know this.
      this.onEmailUnavailable();
      this.setState({ status: this.status.COMPLETE });
      break;
    default:
      console.warn('Unexpected error during signup.');
    }
  }
  
  onEmailUnavailable() {
    this.email.showEmailUnavailable();
    this.setState({ status: this.status.STATIC });
  }

  onComplete() {
    this.props.onSignUp(this.email.serialize());
    
    setTimeout(() => {
      this.clear();
      this.setState({ status: this.status.STATIC });
    }, SUCCESS_MESSAGE_DURATION);
  }
  
  submitBtnClasses() {
    var classes = ['submit-form', 'submit-sign-up'];

    if (this.state.status === this.status.SENDING) {
      classes.push('loading');
    } else if (this.state.status === this.status.COMPLETE) {
      classes.push('complete');
    }

    return classes;
  }

  submitBtnContent() {
    return this.state.status === this.status.COMPLETE ? 'Thanks!' : 'Sign Up';
  }
  
  onEmailKeyUp (val) {
    var matchedDomain = val.match(this.domainRegex);
    
    if (matchedDomain) {
      var school = this.domain2school[matchedDomain[1].toLowerCase()];
      this.school.selectOptWithVal(school);
    }
  }
  
  render() {
    return (
      <div id="signUp">
        <div className="container">
          <div className="row">
            <div className="sign-up-input">
              <EmailInput required={true} placeholder='School Email' ref={this.setEmailRef} onKeyUp={this.onEmailKeyUp}/>
            </div>
            <div className="sign-up-input">
              <FormInput required={true} placeholder='Full Name' ref={this.pushFormCompRef}/>
            </div>
            <div className="sign-up-input school-form-select-container">
              <FormSelect required={true} placeholder='School' options={this.schools} ref={this.setSchoolRef}/>
              <div className="school-not-listed" onClick={this.props.onSubmitSchool}>Don't see your school?</div>
            </div>
            <LgSpinnerBtn classes={this.submitBtnClasses()} btnText={this.submitBtnContent()} onClick={this.serialize} />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
