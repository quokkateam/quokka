import React, { Component } from 'react';
import HorizSpinner from '../widgets/spinners/HorizSpinner'
import $ from 'jquery'
import FormInput from '../shared/FormInput'
import axios from 'axios';

const status = {
  STATIC: 0,
  SERIALIZING: 1,
  SENDING: 2,
  COMPLETE: 3
};

const MOBILE_THRESH = 991;

class Contact extends Component {
	
  constructor(props) {
    super(props);
    
    this.state = {
      status: status.STATIC,
      school: null,
      email: null,
      onMobile: window.innerWidth < MOBILE_THRESH
    };
    
    this.setSectionRef = this.setSectionRef.bind(this);
    this.setSchoolFieldRef = this.setSchoolFieldRef.bind(this);
    this.setEmailFieldRef = this.setEmailFieldRef.bind(this);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.getTopPosition = this.getTopPosition.bind(this);
    this.serialize = this.serialize.bind(this);
    this.sendContactInfo = this.sendContactInfo.bind(this);
    this.submitMobileContainerClasses = this.submitMobileContainerClasses.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
    this.submitMobileContent = this.submitMobileContent.bind(this);
    
    this.listenForWindowResize();
  }
  
  listenForWindowResize() {
    $(window).resize(() => {
      this.setState({ onMobile: window.innerWidth < MOBILE_THRESH })
    });
  }
  
  componentDidUpdate() {
    switch (this.state.status) {
      case status.SERIALIZING:
        this.onSerializing();
        break;
      case status.COMPLETE:
        this.onComplete();
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
    if (this.state.school && this.state.email) {
      this.sendContactInfo();
    }
  }
  
  onComplete() {
    this.schoolField.clearInput();
    this.emailField.clearInput();

    setTimeout(() => {
      this.setState({
        status: status.STATIC,
        school: '',
        email: ''
      });
    }, 1000);
  }
  
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
  
  sendContactInfo() {
    this.setState({ status: status.SENDING });
    
    var payload = {
      school: this.state.school,
      email: this.state.email
    };
    
    // using setTimeout to simulate network request duration
    setTimeout(() => {
      this.setState({ status: status.COMPLETE });
    }, 300);
    
    // axios.post('/api/contact', payload).then(() => {
    //  this.setState({ status: status.COMPLETE });
    // });
  }
	
  submitMobileContainerClasses() {
    var classes = ['submit-mobile-container'];
    
    if (this.state.status == status.SENDING && this.state.onMobile) {
      classes.push('loading');
    }
    
    return classes.join(' ');
  }
  
  submitBtnClasses(mobile) {
    var classes = [mobile ? 'submit-mobile' : 'submit-desktop'];
    
    if (this.state.status == status.COMPLETE) {
      classes.push('completed');
    }
    
    return classes.join(' ');
  }
  
  submitMobileContent() {
    return this.state.status == status.COMPLETE ? 'Thanks!' : 'Submit';
  }
  
	render() {
		return (
		  <section id="contact" ref={this.setSectionRef}>
				<div className="container-fluid">
					<div className="leading-contact-text">Want Quokka on your campus? Let us know!</div>
					<div className="row">
						<div className="col-md-6 col-sm-12 col-xs-12 contact-field-container" role="school">
              <FormInput required={true} classes={['contact-field']} name="school" placeholder="School" defaultValue={this.state.school} ref={this.setSchoolFieldRef} />
						</div>
						<div className="col-md-6 col-sm-12 col-xs-12 contact-field-container" role="email">
              <FormInput required={true} classes={['contact-field']} name="email" placeholder="Email" defaultValue={this.state.email} ref={this.setEmailFieldRef} />
							<button className={this.submitBtnClasses(false)} onClick={this.serialize}></button>
						</div>
					</div>
					<div className={this.submitMobileContainerClasses()}>
						<button className={this.submitBtnClasses(true)} onClick={this.serialize}>{this.submitMobileContent()}</button>
						<HorizSpinner />
					</div>
				</div>
      </section>
		);
	}
}

export default Contact;