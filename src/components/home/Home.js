import React, { Component } from 'react';
import Welcome from './Welcome'
import Mission from './Mission'
import About from './About'
import Contact from './Contact'


class Home extends Component {
  render() {
    return (
      <main>
        <Welcome />
        <Mission />
        <About />
        <Contact />
      </main>
    );
  }
}

export default Home;