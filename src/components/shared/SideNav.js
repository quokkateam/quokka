import React, { Component } from 'react';
import Session from '../../utils/Session';

class SideNav extends Component {

  constructor(props) {
    super(props);
    
    var landingLinks;
    
    if (Session.authed()) {
      landingLinks = [['/challenges', 'Challenges'], ['/faq', 'FAQ']];
    } else {
      landingLinks = [['/signin', 'Sign In'], ['/faq', 'FAQ']];
    }

    var linksMap = {
      'landing': landingLinks,
      'in-app': [
        ['/challenges', 'Challenges'],
        ['/admin', 'Admin'],
        ['/me', 'Profile']
      ]
    };

    var appRole = this.props.inApp ? 'in-app' : 'landing';

    this.state = { links: linksMap[appRole] };

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