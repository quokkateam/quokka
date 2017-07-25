import React from 'react';
import FormInput from '../shared/form/FormInput'
import LgSpinnerBtn from '../widgets/LgSpinnerBtn'
import QComponent from '../abstract/QComponent'
import $ from 'jquery'

// status map for managing state
const status = {
  STATIC: 0,
  SERIALIZING: 1,
  SENDING: 2,
  COMPLETE: 3
};

const SUCCESS_MESSAGE_DURATION = 3000;

class InviteFriendsSection extends QComponent {
  
  constructor(props) {
    super(props);

    // Set our initial state
    this.state = {
      status: status.STATIC,
      email: null,
      onMobile: window.innerWidth < this.MOBILE_THRESH
    };

    this.setEmailFieldRef = this.setEmailFieldRef.bind(this);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
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


  setEmailFieldRef(ref) {
    this.emailField = ref;
  }

  onSerializing() {
    var emailValid = this.emailField.isValid();

    if (emailValid) {
      this.sendContactInfo();
    }
  }

  onComplete() {
    // Empty inputs
    this.emailField.clearInput();

    // Reset component back to its default 'STATIC' state, but wait a second
    // so the user can view the success message of the request.
    setTimeout(() => {
      this.setState({
        status: status.STATIC,
        email: null
      });
    }, SUCCESS_MESSAGE_DURATION);
  }

  serialize() {
    this.setState({
      status: status.SERIALIZING,
      email: this.emailField.serialize()
    });
  }

  // make POST request with email
  sendContactInfo() {
    this.setState({ status: status.SENDING });

    // TODO uncomment this code when we're actually talking to an API.
    // var payload = {
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
    var classes = [mobile ? 'submit-mobile' : 'quokka-nav-button nav-right submit-desktop'];

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
      <div className="container-fluid challenge-invite-friends">
        <div className="leading-contact-text">Have friends who still want to join the Challenge?<br/>Send them an invite.</div>
        <div className="row challenge-invite-friends-form">
          <FormInput required={true} classes={['contact-field']} name="email" placeholder="Email Address" defaultValue={this.state.email} ref={this.setEmailFieldRef} />
          <button className={this.submitBtnClasses(false)} onClick={this.serialize}></button>
        </div>
        <div className="submit-mobile-container">
          <LgSpinnerBtn classes={this.submitBtnClasses(true)} btnText={this.submitMobileContent()} onClick={this.serialize}/>
        </div>
      </div>
    );
  }
}

export default InviteFriendsSection;
