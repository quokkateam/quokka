import EmailInput from '../shared/form/EmailInput';
import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import FormSelect from '../shared/form/FormSelect';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import React from 'react';
import StatusCodes from '../../utils/StatusCodes';
import TextHelper from '../../utils/TextHelper';
import axios from 'axios';

var ax = axios.create({
  baseURL: 'https://quokka-prod-api.herokuapp.com/api'
});

const SUCCESS_MESSAGE_DURATION = 3000;

class SignUp extends Form {
  constructor(props) {
    super(props);

    this.setEmailRef = this.setEmailRef.bind(this);
    this.setSchoolRef = this.setSchoolRef.bind(this);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.submit = this.submit.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.submitBtnContent = this.submitBtnContent.bind(this);
    this.onEmailKeyUp = this.onEmailKeyUp.bind(this);
    this.createDomainRegex = this.createDomainRegex.bind(this);
    this.onInvalidEmailDomain = this.onInvalidEmailDomain.bind(this);
    this.onSignUpResp = this.onSignUpResp.bind(this);
    this.onSignUpError = this.onSignUpError.bind(this);
  }
  
  setEmailRef(ref) {
    this.email = ref;
    this.pushFormCompRef(ref);
  }
  
  setSchoolRef(ref) {
    this.school = ref;
    this.pushFormCompRef(ref);

    ax.get('/schools').then((resp) => {
      this.schools = resp.data.schools || [];
      this.createDomainRegex();

      var selectOptions = this.schools.map((s) => {
        return { value: s.slug, title: s.name };
      }).sort((a, b) => {
        return ~~(a.title > b.title);
      });

      this.school.setState({ options: selectOptions });
    });
  }
  
  createDomainRegex() {
    this.domain2school = {};
    
    this.schools.forEach((s) => {
      (s.domains || []).forEach((domain) => {
        this.domain2school[domain] = s.slug;
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

    var payload = {};
    ['email', 'name', 'school'].forEach((k, i) => {
      payload[k] = this.state.formComps[i];
    });

    ax.post('/users', payload).then((resp) => {
      this.onSignUpResp(resp);
    });
  }
  
  onSignUpResp(resp) {
    switch (resp.status) {
    case 200:
      this.setState({ status: this.status.COMPLETE });
      break;
    case 400:
      this.onSignUpError(resp);
      break;
    default:
      console.warn('Unexpected error during signup.');
    }
  }

  onSignUpError(resp) {
    switch (resp.data.error) {
    case StatusCodes.INVALID_EMAIL_DOMAIN:
      this.onInvalidEmailDomain();
      break;
    case StatusCodes.INVALID_EMAIL_FORMAT:
      this.email.showInvalidEmail();
      this.setState({ status: this.status.STATIC });
      break;
    default:
      // Nothing
    }
  }
  
  onInvalidEmailDomain() {
    var selectedSchoolSlug = this.school.serialize();
    var selectedSchool = this.schools.find((s) => { return s.slug === selectedSchoolSlug; });
    var validDomains = selectedSchool.domains.map((d) => { return '@' + d; });

    var msg = selectedSchool.name + ' emails must end with ' + TextHelper.toProperDelimit(validDomains, ' or ');

    this.email.showInvalidWithMessage(msg);
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
