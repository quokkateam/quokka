import React, { Component } from 'react';
import Session from '../../utils/Session';

class SideNav extends Component {

  constructor(props) {
    super(props);
    
    var landingLinks;
    
    if (Session.authed()) {
      landingLinks = [['/challenges', 'Challenges'], ['/faq', 'FAQ'], ['/signout', 'Sign Out']];
    } else {
      landingLinks = [['/faq', 'FAQ'], ['/signin', 'Sign In'],  ['/signup-page', 'Sign Up']];
    }

    var inAppLinks = [['/challenges', 'Challenges']];

    if (Session.isAdmin()) {
      inAppLinks.push(['/admin', 'Admin']);
    }

    inAppLinks.push(['/signout', 'Sign Out']);

    this.state = {
      links: this.props.inApp ? inAppLinks : landingLinks
    };

    this.createLinks = this.createLinks.bind(this);
  }

  createLinks() {
    return this.state.links.map((linkInfo, i) => {
      return <li key={i}><a href={linkInfo[0]}>{linkInfo[1]}</a></li>;
    });
  }

  render() {
    return (
      <nav id="sideNav">
        <ul className="side-nav-list">{this.createLinks()}</ul>
      </nav>
    );
  }
}

export default SideNav;