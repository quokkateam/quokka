import React, { Component } from 'react';

class LandingHeader extends Component {
  render() {
    return (
      <header id="landingHeader">
        <nav className="header-nav">
          <div className="header-left">
            <a href="/">
              <img alt="Quokka" src="https://s3-us-west-1.amazonaws.com/quokkadev/logos/quokka-white.png" />
            </a>
          </div>
          <div className="header-right">
            <div className="header-dktp">
              <a href="/signup" className="header-nav-link featured">Sign Up</a>
              <a href="/faq" className="header-nav-link">FAQ</a>
            </div>
            <div className="header-mbl" onClick={this.props.onMenuClick}>
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default LandingHeader;