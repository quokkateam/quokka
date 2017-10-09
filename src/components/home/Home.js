import React, { Component } from 'react';
import $ from 'jquery';
import About from './About';
import Banner from '../shared/Banner';
import Contact from './Contact';
import Mission from './Mission';
import Welcome from './Welcome';

class Home extends Component {

  constructor(props) {
    super(props);
    this.setContactRef = this.setContactRef.bind(this);
    this.setBannerRef = this.setBannerRef.bind(this);
    this.onSubmitSchool = this.onSubmitSchool.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  setContactRef(ref){
    this.contactSection = ref;
  }

  setBannerRef(ref){
    this.banner = ref;
  }

  onSubmitSchool() {
    $('html, body').stop().animate({ scrollTop: this.contactSection.getTopPosition() }, 600);
  }

  onSignUp(email, launched) {
    if (launched) {
      var message = 'Thanks for joining the Quokka Challenge! We\'ve sent a confirmation email to **' + email + '** where you can verify and complete your account.';
    } else {
      var message = 'Thanks for joining the Quokka Challenge! We\'ll send an email to **' + email + '** when the Challenge is ready to start at your campus in the next few weeks.';
    }

    this.banner.update({
      message: message,
      buttonText: 'Got it'
    });
  }
  
  render() {
    return (
      <main>
        <Welcome onSubmitSchool={this.onSubmitSchool} onSignUp={this.onSignUp} />
        <Mission />
        <About />
        <Contact ref={this.setContactRef} />
        <Banner ref={this.setBannerRef} />
      </main>
    );
  }
}

export default Home;