import React, { Component } from 'react';
import HorizSpinner from '../widgets/spinners/horiz-spinner'
import $ from 'jquery'
import axios from 'axios';

class Contact extends Component {
	
  constructor(props) {
    super(props);
    this.setSectionRef = this.setSectionRef.bind(this);
    this.setSchoolFieldRef = this.setSchoolFieldRef.bind(this);
    this.setEmailFieldRef = this.setEmailFieldRef.bind(this);
    this.setSubmitMobileContainerRef = this.setSubmitMobileContainerRef.bind(this);
    this.setDesktopBtnRef = this.setDesktopBtnRef.bind(this);
    this.setMobileBtnRef = this.setMobileBtnRef.bind(this);
    this.getTopPosition = this.getTopPosition.bind(this);
    this.onDesktopSubmit = this.onDesktopSubmit.bind(this);
    this.onMobileSubmit = this.onMobileSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.parseFields = this.parseFields.bind(this);
    this.isValidInfo = this.isValidInfo.bind(this);
    this.sendContactInfo = this.sendContactInfo.bind(this);
    this.onMobileComplete = this.onMobileComplete.bind(this);
    this.onDesktopComplete = this.onDesktopComplete.bind(this);
    this.clearContactFields = this.clearContactFields.bind(this);
    this.removeInvalid = this.removeInvalid.bind(this);
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
  
  setSubmitMobileContainerRef(ref) {
    this.submitMobileContainer = ref;
  }
  
  setDesktopBtnRef(ref) {
    this.desktopBtn = ref;
  }
  
  setMobileBtnRef(ref) {
    this.mobileBtn = ref;
  }
  
	getTopPosition() {
    return $(this.section)[0].offsetTop;
	}
	
	onDesktopSubmit() {
    this.onSubmit(false);
  }
  
  onMobileSubmit() {
    this.onSubmit(true);
  }
  
  onSubmit(isMobile) {
    var info = this.parseFields();
    
    if (this.isValidInfo(info, isMobile)) {
      this.sendContactInfo(info, isMobile);
    }
  }
  
  parseFields() {
    return {
      school: $(this.schoolField).val().trim(),
      email: $(this.emailField).val().trim()
    };
  }
  
  isValidInfo(info, isMobile) {
    var isValid = true;
  
    for (var k in info) {
      if (!info[k]) {
        $('.contact-field[name=' + k + ']').addClass(isMobile ? 'invalid-mobile' : 'invalid');
        isValid = false
      }
    }
  
    return isValid;
  }
  
  sendContactInfo(info, isMobile) {
    if (isMobile) {
      $(this.submitMobileContainer).addClass('loading');
    }
    
    isMobile ? this.onMobileComplete() : this.onDesktopComplete();
    // axios.post('/api/contact', info).then((resp) => {
    //   isMobile ? this.onMobileComplete() : this.onDesktopComplete();
    // });
  }
  
  onMobileComplete() {
    var $btn = $(this.mobileBtn);
    
    setTimeout(function () {
      $btn.html('Thanks!').addClass('completed');
      $(this.submitMobileContainer).removeClass('loading');
      this.clearContactFields();
    }.bind(this), 1000);
  }
  
  onDesktopComplete() {
    var $btn = $(this.desktopBtn);
    
    $btn.addClass('completed');
  
    setTimeout(function () {
      $btn.removeClass('completed');
      this.clearContactFields();
    }.bind(this), 1200);
  }
  
  clearContactFields() {
    $(this.schoolField).val('');
    $(this.emailField).val('');
  }
	
  removeInvalid(e) {
    $(e.currentTarget).removeClass('invalid invalid-mobile');
    $(this.mobileBtn).removeClass('completed').html('Submit');
  }
  
	render() {
		return (
		  <section id="contact" ref={this.setSectionRef}>
				<div className="container-fluid">
					<div className="leading-contact-text">Want Quokka on your campus? Let us know!</div>
					<div className="row">
						<div className="col-md-6 col-sm-12 col-xs-12 contact-field-container" role="school">
							<input type="text" className="contact-field" placeholder="School" name="school" ref={this.setSchoolFieldRef} onKeyPress={this.removeInvalid} />
						</div>
						<div className="col-md-6 col-sm-12 col-xs-12 contact-field-container" role="email">
							<input type="text" className="contact-field" placeholder="Email" name="email" ref={this.setEmailFieldRef} onKeyPress={this.removeInvalid} />
							<button className="submit-desktop" data-action="submit-contact" ref={this.setDesktopBtnRef} onClick={this.onDesktopSubmit}></button>
						</div>
					</div>
					<div className="submit-mobile-container" ref={this.setSubmitMobileContainerRef}>
						<button className="submit-mobile" data-action="submit-contact" ref={this.setMobileBtnRef} onClick={this.onMobileSubmit}>Submit</button>
						<HorizSpinner />
					</div>
				</div>
      </section>
		);
	}
}

export default Contact;