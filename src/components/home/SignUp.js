import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import FormSelect from '../shared/form/FormSelect';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import React from 'react';

const SUCCESS_MESSAGE_DURATION = 3000;

class SignUp extends Form {
  
  constructor(props) {
    super(props);
    
    this.schools = [
      {
        value: 'vanderbilt',
        title: 'Vanderbilt University',
        domains: [
          'vanderbilt',
          'vu'
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
        value: 'emory',
        title: 'Emory University',
        domains: [
          'emory'
        ]
      }
    ];
    
    this.setSchoolRef = this.setSchoolRef.bind(this);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.submit = this.submit.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.submitBtnContent = this.submitBtnContent.bind(this);
    this.onEmailKeyUp = this.onEmailKeyUp.bind(this);
    this.createDomainRegex = this.createDomainRegex.bind(this);
    
    this.createDomainRegex();
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
    
    this.domainRegex = new RegExp('(' + Object.keys(this.domain2school).join('|') + ')', 'i');
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

    // using setTimeout to simulate network request duration
    setTimeout(() => {
      this.setState({ status: this.status.COMPLETE });
    }, 300);

    // TODO uncomment this code when we're actually talking to an API.
    
    var payload = {};
    ['email', 'name', 'school'].forEach((k, i) => {
      payload[k] = this.state.formComps[i];
    });
    
    // axios.post('/users', payload).then(() => {
    //  this.setState({ status: status.COMPLETE });
    // });
  }

  onComplete() {
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
              <FormInput required={true} placeholder='School Email' ref={this.pushFormCompRef} onKeyUp={this.onEmailKeyUp}/>
            </div>
            <div className="sign-up-input">
              <FormInput required={true} placeholder='Name' ref={this.pushFormCompRef}/>
            </div>
            <div className="sign-up-input">
              <FormSelect required={true} placeholder='School' options={this.schools} ref={this.setSchoolRef}/>
            </div>
            <LgSpinnerBtn classes={this.submitBtnClasses()} btnText={this.submitBtnContent()} onClick={this.serialize} />
          </div>
        </div>
      </div>
		);
	}
}

export default SignUp;