import React, { Component } from 'react';

class AppHeader extends Component {

  constructor(props) {
    super(props);
    this.headerLinkClasses = this.headerLinkClasses.bind(this);
  }

  headerLinkClasses(route) {
    var classes = ['header-nav-link'];

    if (this.props.location.pathname === route) {
      classes.push('featured');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <header id="appHeader">
        <nav className="header-nav">
          <div className="header-left">
            <a href="/">
              <img alt="Quokka" src="https://s3-us-west-1.amazonaws.com/quokkadev/logos/quokka-multicolor.png" />
            </a>
          </div>
          <div className="header-right">
            <div className="header-dktp">
              <a href="/me" className={this.headerLinkClasses('/me')}>Profile</a>
              <a href="/admin" className={this.headerLinkClasses('/admin')}>Admin</a>
              <a href="/wall" className={this.headerLinkClasses('/wall')}>Wall</a>
              <a href="/challenge" className={this.headerLinkClasses('/challenge')}>Challenge</a>
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

export default AppHeader;
