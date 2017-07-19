import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Main from './Main'
import LandingHeader from './components/shared/headers/LandingHeader'
import AppHeader from './components/shared/headers/AppHeader'
import Footer from './components/shared/footers/Footer'
import SideNav from './components/shared/SideNav'
import $ from 'jquery'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.setAppContainerRef = this.setAppContainerRef.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    
    // Set up wrapped instances of our route-dependent components so
    // that their props can also get passed down.
    this.LandingHeaderWProps = (props) => {
      return (
        <LandingHeader onMenuClick={this.onMenuClick} {...props}/>
      );
    };
    
    this.AppHeaderWProps = (props) => {
      return (
        <AppHeader onMenuClick={this.onMenuClick} {...props}/>
      );
    };
    
    this.LandingSideNav = (props) => {
      return (
        <SideNav appRole="landing" {...props}/>
      );
    };
    
    this.InAppSideNav = (props) => {
      return (
        <SideNav appRole="in-app" {...props}/>
      );
    };
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
          <Switch>
            <Route exact path='/' component={this.LandingHeaderWProps}/>
            <Route path='/check-in' component={this.AppHeaderWProps}/>
          </Switch>
          <Main />
          <Footer />
        </div>
        <Switch>
          <Route exact path='/' component={this.LandingSideNav}/>
          <Route path='/check-in' component={this.InAppSideNav}/>
        </Switch>
      </div>
    );
  }
}

export default App;