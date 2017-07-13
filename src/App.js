import React, { Component } from 'react';
import Main from './Main'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;