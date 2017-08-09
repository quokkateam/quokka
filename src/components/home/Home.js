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

  onSignUp(email) {
    this.banner.update({
      message: 'Thanks for joining the Quokka challenge! Check your email at **' + email + '** to verify your account and get the latest updates about the first challenge.',
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