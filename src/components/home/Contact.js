import React from 'react';
import QComponent from '../abstract/QComponent'
import LgSpinnerBtn from '../widgets/LgSpinnerBtn'
import $ from 'jquery'
import FormInput from '../shared/form/FormInput'

// status map for managing state
const status = {
  STATIC: 0,
  SERIALIZING: 1,
  SENDING: 2,
  COMPLETE: 3
};

const SUCCESS_MESSAGE_DURATION = 3000;

class Contact extends QComponent {

  constructor(props) {
    super(props);

    // Set our initial state
    this.state = {
      status: status.STATIC,
      school: null,
      email: null,
      onMobile: window.innerWidth < this.MOBILE_THRESH
    };

    this.setSectionRef = this.setSectionRef.bind(this);
    this.setSchoolFieldRef = this.setSchoolFieldRef.bind(this);
    this.setEmailFieldRef = this.setEmailFieldRef.bind(this);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.getTopPosition = this.getTopPosition.bind(this);
    this.serialize = this.serialize.bind(this);
    this.sendContactInfo = this.sendContactInfo.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.submitMobileContent = this.submitMobileContent.bind(this);

    this.listenForWindowResize();
  }

  // Update the 'onMobile' state any time the window changes size
  listenForWindowResize() {
    $(window).resize(() => {
      this.setState({ onMobile: window.innerWidth < this.MOBILE_THRESH })
    });
  }

  componentDidUpdate() {
    // Set up handlers for when our component changes state
    switch (this.state.status) {
      case status.SERIALIZING:
        this.onSerializing();
        break;
      case status.COMPLETE:
        this.onComplete();
        break;
      case status.SENDING:
        // Do nothing.
        break;
      case status.STATIC:
        // Do nothing.
        break;
      default:
        console.warn('Unexpected status case');
        break;
    }

    return true;
  }

  setSectionRef(ref) {
    this.section = ref;
  }

  setSchoolFieldRef(ref) {
    this.schoolField = ref;
  }

  setEmailFieldRef(ref) {
    this.emailField = ref;
  }

  onSerializing() {
    var schoolValid = this.schoolField.isValid();
    var emailValid = this.emailField.isValid();

    if (schoolValid && emailValid) {
      this.sendContactInfo();
    }
  }

  onComplete() {
    // Empty inputs
    this.schoolField.clearInput();
    this.emailField.clearInput();

    // Reset component back to its default 'STATIC' state, but wait a second
    // so the user can view the success message of the request.
    setTimeout(() => {
      this.setState({
        status: status.STATIC,
        school: null,
        email: null
      });
    }, SUCCESS_MESSAGE_DURATION);
  }

  // get y-position of this section on the page for scroll-to purposes
  getTopPosition() {
    return $(this.section)[0].offsetTop;
  }

  serialize() {
    this.setState({
      status: status.SERIALIZING,
      school: this.schoolField.serialize(),
      email: this.emailField.serialize()
    });
  }

  // make POST request with school and email
  sendContactInfo() {
    this.setState({ status: status.SENDING });

    // TODO uncomment this code when we're actually talking to an API.
    // var payload = {
    //   school: this.state.school,
    //   email: this.state.email
    // };

    // using setTimeout to simulate network request duration
    setTimeout(() => {
      this.setState({ status: status.COMPLETE });
    }, 300);

    // TODO uncomment this code when we're actually talking to an API.
    // axios.post('/api/contact', payload).then(() => {
    //  this.setState({ status: status.COMPLETE });
    // });
  }

  submitBtnClasses(mobile) {
    var classes = [mobile ? 'submit-mobile' : 'submit-desktop'];

    if (this.state.status === status.COMPLETE) {
      classes.push('complete');
    } else if (this.state.status === status.SENDING && mobile) {
      classes.push('loading');
    }

    return mobile ? classes : classes.join(' ');
  }

  submitMobileContent() {
    return this.state.status === status.COMPLETE ? 'Thanks!' : 'Submit';
  }

  render() {
    return (
      <section id="contact" ref={this.setSectionRef}>
        <div className="container-fluid">
          <div className="leading-contact-text">Want Quokka on your campus? Let us know!</div>
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12 contact-field-container">
              <FormInput required={true} classes={['contact-field']} name="school" placeholder="School" defaultValue={this.state.school} ref={this.setSchoolFieldRef} />
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12 contact-field-container">
              <FormInput required={true} classes={['contact-field']} name="email" placeholder="Email" defaultValue={this.state.email} ref={this.setEmailFieldRef} />
              <button className={this.submitBtnClasses(false)} onClick={this.serialize}></button>
            </div>
          </div>
          <div className="submit-mobile-container">
            <LgSpinnerBtn classes={this.submitBtnClasses(true)} btnText={this.submitMobileContent()} onClick={this.serialize}/>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
