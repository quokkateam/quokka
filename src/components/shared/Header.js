import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="header-nav">
          <div className="header-left">
            <a href="/">
              <img alt="Quokka" src="https://s3-us-west-1.amazonaws.com/quokkadev/logos/quokka-white.png" />
            </a>
          </div>
        </nav>
      </header>
    );
  }
}
  
export default Header;