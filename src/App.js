import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import $ from 'jquery';
import Header from './components/shared/Header';
import Footer from './components/shared/footers/Footer';
import Main from './Main';
import SideNav from './components/shared/SideNav';
import Themes from './utils/Themes';

class App extends Component {

  constructor(props) {
    super(props);
    this.setAppContainerRef = this.setAppContainerRef.bind(this);
    this.header = this.header.bind(this);
    this.inAppSideNav = this.inAppSideNav.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  
  setAppContainerRef(ref) {
    this.appContainer = ref;

    $(window).resize(() => {
      $(this.appContainer).removeClass('show-menu');
      $('#sideNav').removeClass('show-menu');
    });
  }
  
  header(inApp, theme, fixed) {
    return ((props) => {
      return (
        <Header inApp={inApp} theme={theme} fixed={fixed} onMenuClick={this.onMenuClick} {...props}/>
      );
    });
  }
  
  inAppSideNav() {
    return ((props) => {
      return (
        <SideNav inApp={true} {...props}/>
      );
    });
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

  render() {

    return (
      <div>
        <div id="appContainer" className={document.location.pathname.split('/')[1]} ref={this.setAppContainerRef}>
          <Switch>
            <Route exact path='/' component={this.header(false, Themes.WHITE_ON_TRANS, false)}/>
            <Route exact path='/faq' component={this.header(false, Themes.COLOR_ON_WHITE, true)}/>
            <Route exact path='/signin' component={this.header(false, Themes.COLOR_ON_WHITE, true)}/>
            <Route exact path='/signout' component={this.header(false, Themes.COLOR_ON_WHITE, true)}/>
            <Route path='/check-in/week:weekNum' component={this.header(true, Themes.COLOR_ON_WHITE, true)}/>
            <Route path='/challenge/week:weekNum' component={this.header(true, Themes.COLOR_ON_WHITE, true)}/>
            <Route exact path='/challenges' component={this.header(true, Themes.COLOR_ON_WHITE, true)}/>
          </Switch>
          <Main />
          <Footer />
        </div>
        <Switch>
          <Route exact path='/' component={SideNav}/>
          <Route exact path='/faq' component={SideNav}/>
          <Route exact path='/signin' component={SideNav}/>
          <Route exact path='/signout' component={SideNav}/>
          <Route path='/check-in/week:weekNum' component={this.inAppSideNav()}/>
          <Route path='/challenge/week:weekNum' component={this.inAppSideNav()}/>
          <Route exact path='/challenges' component={this.inAppSideNav()}/>
        </Switch>
      </div>
    );
  }
}

export default App;