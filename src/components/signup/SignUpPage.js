import Ajax from '../../utils/Ajax';
import EmailInput from '../shared/form/EmailInput';
import Form from '../shared/form/Form';
import FormInput from '../shared/form/FormInput';
import FormSelect from '../shared/form/FormSelect';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import React from 'react';
import StatusCodes from '../../utils/StatusCodes';
import TextHelper from '../../utils/TextHelper';

const SUCCESS_MESSAGE_DURATION = 3000;

class SignUpPage extends Form {
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
    this.setGenderInputRef = this.setGenderInputRef.bind(this);
    this.setAgeInputRef = this.setAgeInputRef.bind(this);
    this.setClassYearInputRef = this.setClassYearInputRef.bind(this);
    this.setHearAboutInputRef = this.setHearAboutInputRef.bind(this);
  }

  setClassYearInputRef(ref) {
    this.classYear = ref;
    this.pushFormCompRef(ref);

    this.classYearOptions = [{value: 'Freshman', title: 'Freshman'}, {value: 'Sophomore', title: 'Sophomore'}, {value: 'Junior', title: 'Junior'}, {value: 'Senior', title: 'Senior'}, {value: 'Other', title: 'Other'}];
    this.classYear.setState({ options: this.classYearOptions })
  }

  setHearAboutInputRef(ref) {
    this.hearAbout = ref;
    this.pushFormCompRef(ref);

    this.hearAboutOptions = [{value: 'Email', title: 'Email'}, {value: 'Website', title: 'Website'}, {value: 'Flyer', title: 'Flyer'}, {value: 'Friend', title: 'Friend'}, {value: 'Other', title: 'Other'}];
    this.hearAbout.setState({ options: this.hearAboutOptions });
  }

  setGenderInputRef(ref) {
    this.gender = ref;
    this.pushFormCompRef(ref);
  }

  setAgeInputRef(ref) {
    this.age = ref;
    this.pushFormCompRef(ref);
  }
  
  setEmailRef(ref) {
    this.email = ref;
    this.pushFormCompRef(ref);
  }
  
  setSchoolRef(ref) {
    this.school = ref;
    this.pushFormCompRef(ref);

    Ajax.get('/api/schools')
      .then((resp) => resp.json())
      .then((data) => {
        this.schools = data.schools || [];
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
    ['email', 'name', 'gender', 'age', 'school', 'classYear', 'hearAbout'].forEach((k, i) => {
      payload[k] = this.state.formComps[i];
      console.log(payload[k]);
    });

    Ajax.post('/api/users', payload).then((resp) => {
      this.onSignUpResp(resp);
    });
  }
  
  onSignUpResp(resp) {
    switch (resp.status) {
    case 201:
      console.log('201 response');
      resp.json().then((data) => {
        this.setState({
          status: this.status.COMPLETE,
          launched: !!data.launched
        });
      });
      break;
    case 400:
      // TODO: REMOVE THIS HACK LATER
      console.log('400 warning as expected');
      resp.json().then((data) => {
        this.setState({
          status: this.status.COMPLETE,
          launched: !!data.launched
        });
      });
      // -----

      // resp.json().then((data) => {
      //   this.onSignUpError(data);
      // });
      break;
    default:
      console.warn('Unexpected error during signup.');
    }
  }

  onSignUpError(data) {
    switch (data.error) {
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
    //this.props.onSignUp(this.email.serialize(), this.state.launched);
    
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
      <div id="signUpPage">
        <div className="container">

          <br/><br/><br/><br/><br/>

          <div className="row">
            <div className="sign-up-input">
              <FormInput required={true} placeholder='Full Name' ref={this.pushFormCompRef}/>
            </div>
          </div>

          <div className="row">
            <div className="sign-up-input">
              <FormInput required={true} placeholder='Gender' ref={this.setGenderInputRef}/>
            </div>
          </div>

          <div className="row">
            <div className="sign-up-input">
              <FormInput required={true} placeholder='Age' ref={this.setAgeInputRef}/>
            </div>
          </div>

          <div className="row">
            <div className="sign-up-input">
              <EmailInput required={true} placeholder='School Email' ref={this.setEmailRef} onKeyUp={this.onEmailKeyUp}/>
            </div>
          </div>
            
          <div className="row">
            <div className="sign-up-input school-form-select-container">
              <FormSelect required={true} placeholder='School' options={this.schools} ref={this.setSchoolRef}/>
              <div className="school-not-listed" onClick={this.props.onSubmitSchool}>School not shown?</div>
            </div>
          </div>

          <div className="row">
            <div className="sign-up-input school-form-select-container">
              <FormSelect required={true} placeholder='Class Year' options={this.classYearOptions} ref={this.setClassYearInputRef}/>
            </div>
          </div>

          <div className="row">
            <div className="sign-up-input school-form-select-container">
              <FormSelect required={true} placeholder='How did you hear about the Challenge?' options={this.hearAboutOptions} ref={this.setHearAboutInputRef}/>
            </div>
          </div>

          <div className="row">
            <LgSpinnerBtn classes={this.submitBtnClasses()} btnText={this.submitBtnContent()} onClick={this.serialize} />
            <br/><br/><br/><br/><br/>
          </div>

        </div>
      </div>
    );
  }
}

export default SignUpPage;