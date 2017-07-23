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

  // TODO: Create social media account and use actual links to those rather than placeholder of '/'

  render() {
    return (
      <footer>
        <div className="container-fluid">
          <div className="row">
            <FooterLinkSection classes={['col-md-3']} title="Quokka" links={linkSections.quokka} />
            <FooterLinkSection classes={['col-md-3']} title="Company" links={linkSections.company} />
            <FooterLinkSection classes={['col-md-3']} title="Legal" links={linkSections.legal} />
            <div className="footer-section col-md-3">
              <div className="soc-media-copyright">
                <div className="soc-media">
                  <a href="/">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="/">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
                <div className="copyright">© 2017 Quokka, Inc.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;