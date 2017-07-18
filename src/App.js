import React, { Component } from 'react';
import Main from './Main'
import LandingHeader from './components/shared/headers/LandingHeader'
import Footer from './components/shared/Footer'
import SideNav from './components/shared/SideNav'
import $ from 'jquery'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.setAppContainerRef = this.setAppContainerRef.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  
  onMenuClick() {
    var closeMenu = $(this.appContainer).hasClass('show-menu');
    var $sideNav = $('#sideNav');
    
    $(this.appContainer).toggleClass('show-menu');
    
    if (closeMenu) {
      $sideNav.removeClass('show-menu');
    } else {
      setTimeout(() => {
        $sideNav.addClass('show-menu');
      }, 300);
    }
  }
  
  setAppContainerRef(ref) {
    this.appContainer = ref;
  }
  
  render() {
    return (
      <div>
        <div id="appContainer" ref={this.setAppContainerRef}>
          <LandingHeader onMenuClick={this.onMenuClick} />
          <Main />
          <Footer />
        </div>
        <SideNav />
      </div>
    );
  }
}

export default App;