import React, { Component } from 'react';

class SideNav extends Component {
  
  constructor(props) {
    super(props);
    
    // keeping as a "var" for now, as I can see the '/admin' link needing to be dynamically added
    var linksMap = {
      'landing': [
        ['/blog', 'Blog'],
        ['/signup', 'Sign Up']
      ],
      'in-app': [
        ['/challenge', 'Challenge'],
        ['/wall', 'Wall'],
        ['/admin', 'Admin'],
        ['/me', 'Profile']
      ]
    };
    
    var role = this.props.role || '';
    
    this.state = { links: linksMap[role || 'landing'] };
    
    this.createLinks = this.createLinks.bind(this);
  }
  
  createLinks() {
    return this.state.links.map((linkInfo) => {
      return <li key={Math.random()}><a href={linkInfo[0]}>{linkInfo[1]}</a></li>;
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