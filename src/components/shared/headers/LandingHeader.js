import React, { Component } from 'react';
import Session from '../../../utils/Session';

class LandingHeader extends Component {
  
  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
  }
  
  getLinks() {
    var links;
    
    if (Session.authed()) {
      links = [
        {
          text: 'FAQ',
          href: '/faq'
        },
        {
          text: 'Challenges',
          href: '/challenges'
        }
      ];
    } else {
      links = [
        {
          text: 'Sign In',
          href: '/signin',
          featured: true
        },
        {
          text: 'FAQ',
          href: '/faq'
        }
      ];
    }
    
    return links.map((data, i) => {
      var classes = ['header-nav-link'];
      
      if (data.featured) {
        classes.push('featured');
      }
      
      return <a key={i} href={data.href} className={classes.join(' ')}>{data.text}</a>;
    });
  }
  
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
            <div className="header-dktp">{this.getLinks()}</div>
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