import React, { Component } from 'react';
import FooterLinkSection from './FooterLinkSection'

const linkSections = {
  quokka: [
    ['/', 'Overview'],
    ['mailto:support@quokkachallenge.com', 'Support'],
    ['mailto:team@quokkachallenge.com', 'Contact']
  ],
  company: [
    ['/', 'About'],
    ['/blog', 'Blog'],
    ['/', 'Schools']
  ],
  legal: [
    ['/', 'Terms of Service'],
    ['/', 'Privacy Policy']
  ]
};

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container-fluid">
          <div className="row">
            <FooterLinkSection classes={['col-md-3']} title="Quokka" links={linkSections.quokka} />
            <FooterLinkSection classes={['col-md-3']} title="Company" links={linkSections.company} />
            <FooterLinkSection classes={['col-md-3']} title="Legal" links={linkSections.legal} />
            <div className="footer-section col-md-3 ">
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;