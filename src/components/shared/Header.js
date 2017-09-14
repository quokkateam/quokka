import React, { Component } from 'react';
import Session from '../../utils/Session';
import Themes from '../../utils/Themes';
import UserDropdown from '../shared/UserDropdown';

class Header extends Component {

  constructor(props) {
    super(props);
    
    this.defaultTheme = Themes.COLOR_ON_WHITE;
    
    this.getLogo = this.getLogo.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.getInAppLinks = this.getInAppLinks.bind(this);
    this.getLandingLinks = this.getLandingLinks.bind(this);
    this.formatLinks = this.formatLinks.bind(this);
  }

  getInAppLinks() {
    var links = [{ text: 'Profile', href: '/me' }];

    if (Session.isAdmin()) {
      links.push({ text: 'Admin', href: '/admin' });
    }

    links.push({ text: 'Challenges', href: '/challenges' });

    links.forEach((info) => {
      if (info.href === this.props.match.path) {
        info.featured = true;
      }
    });

    return this.formatLinks(links);
  }

  getLandingLinks() {
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

    return this.formatLinks(links);
  }

  formatLinks(links) {
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
      logo = logos.multicolor;
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

  getUserIcon() {
    if (!Session.authed()) {
      return;
    }

    return <UserDropdown/>;
  }

  render() {
    return (
      <header id={this.props.inApp ? 'appHeader' : 'landingHeader'} className={this.getClasses()}>
        <nav className="header-nav">
          <div className="header-left">
            <a className="img-link" href="/">
              <img alt="Quokka" src={'https://s3-us-west-1.amazonaws.com/quokkadev/logos/' + this.getLogo()} />
            </a>
          </div>
          <div className="header-right">
            {this.getUserIcon()}
            <div className="header-dktp">
              {this.props.inApp ? this.getInAppLinks() : this.getLandingLinks()}
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

export default Header;
