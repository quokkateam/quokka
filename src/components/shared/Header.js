import React, { Component } from 'react';
import Session from '../../utils/Session';
import Themes from '../../utils/Themes';

class Header extends Component {

  constructor(props) {
    super(props);
    
    this.defaultTheme = Themes.COLOR_ON_WHITE;
    
    this.getLinks = this.getLinks.bind(this);
    this.getLogo = this.getLogo.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }
  
  getLinks() {
    var links;
    
    if (this.props.inApp) {
      links = [
        {
          text: 'Profile',
          href: '/me'
        },
        {
          text: 'Admin',
          href: '/admin'
        },
        {
          text: 'Challenges',
          href: '/challenges'
        }
      ];
      
      links.forEach((info) => {
        if (info.href === this.props.match.path) {
          info.featured = true;
        }
      });
    } else {
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
    }
    
    return links.map((data, i) => {
      var classes = ['header-nav-link'];
      
      if (data.featured) {
        classes.push('featured');
      }
      
      return <a key={i} href={data.href} className={classes.join(' ')}>{data.text}</a>;
    });
  }
  
  getLogo() {
    var logo;
    var logos = {
      white: 'quokka-white.png',
      multicolor: 'quokka-multicolor.png'
    };
    
    switch(this.props.theme) {
    case Themes.COLOR_ON_WHITE:
      logo = logos.multicolor;
      break;
    case Themes.WHITE_ON_TRANS:
      logo = logos.white;
      break;
    default:
      logo = logos.multicolor
    }
    
    return logo;
  }
  
  getClasses() {
    var classes = [this.props.theme || this.defaultTheme];
    
    if (this.props.fixed) {
      classes.push('fixed');
    }
    
    return classes.join(' ');
  }

  render() {
    return (
      <header id={this.props.inApp ? 'appHeader' : 'landingHeader'} className={this.getClasses()}>
        <nav className="header-nav">
          <div className="header-left">
            <a href="/">
              <img alt="Quokka" src={'https://s3-us-west-1.amazonaws.com/quokkadev/logos/' + this.getLogo()} />
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

export default Header;
