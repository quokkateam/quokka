import React, { Component } from 'react';

import FooterLinkSection from './FooterLinkSection';
import PrivacyPolicyModal from '../../modals/PrivacyPolicyModal';
import TermsOfServiceModal from '../../modals/TermsOfServiceModal';

class Footer extends Component {

  constructor(props) {
    super(props);

    this.setTosModalRef = this.setTosModalRef.bind(this);
    this.setPrivPolModalRef = this.setPrivPolModalRef.bind(this);
    this.showTos = this.showTos.bind(this);
    this.showPrivPol = this.showPrivPol.bind(this);

    this.linkSections = {
      quokka: [
        ['/', 'Overview'],
        ['mailto:support@quokkachallenge.com', 'Support'],
        ['mailto:team@quokkachallenge.com', 'Contact']
      ],
      company: [
        ['/', 'About'],
        ['/faq', 'FAQ']
      ],
      legal: [
        /*eslint-disable no-script-url*/
        ['javascript:void(0)', 'Terms of Service', this.showTos],
        ['javascript:void(0)', 'Privacy Policy', this.showPrivPol]
      ]
    };
  }

  setTosModalRef(ref) {
    this.tosModal = ref;
  }

  setPrivPolModalRef(ref) {
    this.privPolModal = ref;
  }

  showTos() {
    this.tosModal.open();
  }

  showPrivPol() {
    this.privPolModal.open();
  }

  render() {
    return (
      <footer>
        <div className="container-fluid">
          <div className="row">
            <FooterLinkSection classes={['col-md-3', 'col-sm-3', 'col-xs-6']} title="Quokka" links={this.linkSections.quokka} />
            <FooterLinkSection classes={['col-md-3', 'col-sm-3', 'col-xs-6']} title="Company" links={this.linkSections.company} />
            <FooterLinkSection classes={['col-md-3', 'col-sm-3', 'col-xs-6']} title="Legal" links={this.linkSections.legal} />
            <div className="footer-section col-md-3 col-sm-3 col-xs-6">
              <div className="soc-media-copyright">
                <div className="soc-media">
                  {/* eslint-disable */}
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                  {/* eslint-enable */}
                </div>
                <div className="copyright">© 2017 Quokka, Inc.</div>
              </div>
            </div>
          </div>
        </div>
        <TermsOfServiceModal ref={this.setTosModalRef}/>
        <PrivacyPolicyModal ref={this.setPrivPolModalRef}/>
      </footer>
    );
  }
}

export default Footer;