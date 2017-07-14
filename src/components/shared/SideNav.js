import React, { Component } from 'react';

class SideNav extends Component {
	render() {
		return (
			<nav id="sideNav">
        <ul className="side-nav-list">
          <li>
            <a href="/blog" className="side-nav-link">Blog</a>
          </li>
          <li>
            <a href="signup" className="side-nav-link">Sign Up</a>
          </li>
        </ul>
      </nav>
		);
	}
	
}

export default SideNav;