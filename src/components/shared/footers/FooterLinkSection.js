import React, { Component } from 'react';

class FooterLinkSection extends Component {

  constructor(props) {
    super(props);
    this.createFooterLinks = this.createFooterLinks.bind(this);
    this.getContainerClasses = this.getContainerClasses.bind(this);
  }

  createFooterLinks() {
    var link, title, onClick;
    return this.props.links.map((linkInfo, i) => {
      link = linkInfo[0];
      title = linkInfo[1];
      onClick = linkInfo[2];

      if (onClick) {
        return <li key={i}><a href={link} onClick={onClick}>{title}</a></li>;
      } else {
        return <li key={i}><a href={link}>{title}</a></li>;
      }
    });
  }

  getContainerClasses() {
    var classes = this.props.classes || [];

    classes.unshift('footer-link-section');
    classes.unshift('footer-section');

    return classes.join(' ');
  }

  render() {
    return (
      <div className={this.getContainerClasses()}>
        <div className="footer-link-title">{this.props.title}</div>
        <ul className="footer-links">{this.createFooterLinks()}</ul>
      </div>
    );
  }
}

export default FooterLinkSection;