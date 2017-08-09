import React, { Component } from 'react';

import $ from 'jquery';
import About from './About';
import Contact from './Contact';
import Mission from './Mission';
import Welcome from './Welcome';

class Home extends Component {

  constructor(props) {
    super(props);
    this.setContactRef = this.setContactRef.bind(this);
    this.onSubmitSchool = this.onSubmitSchool.bind(this);
  }

  setContactRef(ref){
    this.contactSection = ref;
  }

  onSubmitSchool() {
    $('html, body').stop().animate({ scrollTop: this.contactSection.getTopPosition() }, 600);
  }

  render() {
    return (
      <main>
        <Welcome onSubmitSchool={this.onSubmitSchool} />
        <Mission />
        <About />
        <Contact ref={this.setContactRef} />
      </main>
    );
  }
}

export default Home;