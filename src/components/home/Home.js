import React, { Component } from 'react';
import Welcome from './Welcome'
import Mission from './Mission'
import About from './About'
import Contact from './Contact'
import $ from 'jquery'

class Home extends Component {

  constructor(props) {
    super(props);
    this.setContactRef = this.setContactRef.bind(this);
    this.onRequestToJoin = this.onRequestToJoin.bind(this);
  }

  setContactRef(ref){
    this.contactSection = ref;
  }

  onRequestToJoin() {
    $('html, body').stop().animate({ scrollTop: this.contactSection.getTopPosition() }, 600);
  }

  render() {
    return (
      <main>
        <Welcome onRequestToJoin={this.onRequestToJoin} />
        <Mission />
        <About />
        <Contact ref={this.setContactRef} />
      </main>
    );
  }
}

export default Home;