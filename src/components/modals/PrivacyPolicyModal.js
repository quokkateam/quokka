import React from 'react';

import ModalAction1Btn from './ModalAction1Btn';
import QuokkaMarkdown from '../shared/QuokkaMarkdown';
import QuokkaModal from '../shared/QuokkaModal';

class PrivacyPolicyModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.pp = '**Privacy Policy**\n' +
      '**Last Updated: October 1, 2017**\n' +
      '\n' +
      'This privacy policy (“**Policy**”) describes how QUOKKA INC and its related companies (“**Company**”) collect, use and share personal information of consumer users of this website, www.quokkachallenge.com (the “**Site**”). \n' +
      '\n' +
      '**WHAT WE COLLECT**\n' +
      '\n' +
      'We get information about you in a range of ways. \n' +
      '\n' +
      '- **Information You Give Us**. We collect your‎ name, email address, password, as well as other information you directly give us on our Site.\n' +
      '\n' +
      '- **Information Automatically Collected**. We automatically log information about you and your computer. For example, when visiting our Site, we log your computer operating system type, browser type, browser language, the website you visited before browsing to our Site, pages you viewed, how long you spent on a page, access times and information about your use of and actions on our Site. \n' +
      '\n' +
      '- **Cookies**. We may log information using "cookies." Cookies are small data files stored on your hard drive by a website. We may use both session Cookies (which expire once you close your web browser) and persistent Cookies (which stay on your computer until you delete them) to provide you with a more personal and interactive experience on our Site.    This type of information is collected to make the Site more useful to you and to tailor the experience with us to meet your special interests and needs.\n' +
      '\n' +
      '**USE OF PERSONAL INFORMATION**\n' +
      '\n' +
      'We use your personal information as follows:\n' +
      '- We use your personal information to operate, maintain, and improve our sites, products, and services.\n' +
      '- We use your personal information to process and deliver contest entries and rewards.\n' +
      '- We use your personal information to respond to comments and questions and provide customer service.\n' +
      '- We use your personal information to send information including confirmations, technical notices, updates, security alerts, and support and administrative messages.\n' +
      '- We use your personal information to communicate about promotions, upcoming events, and other news about products and services offered by us and our selected partners.\n' +
      '- We use your personal information to link or combine user information with other personal information.\n' +
      '- We use your personal information to protect, investigate, and deter against fraudulent, unauthorized, or illegal activity.\n' +
      '- We use your personal information to provide and deliver products and services customers request.\n' +
      '\n' +
      '**SHARING OF PERSONAL INFORMATION**\n' +
      '\n' +
      'We may share personal information as follows:\n' +
      '\n' +
      '- We may share personal information with your consent. For example, you may let us share personal information with others for their own marketing uses. Those uses will be subject to their privacy policies.\n' +
      '- We may share personal information when we do a business deal, or negotiate a business deal, involving the sale or transfer of all or a part of our business or assets. These deals can include any merger, financing, acquisition, or bankruptcy transaction or proceeding.\n' +
      '- We may share personal information for legal, protection, and safety purposes.\n' +
      '  - We may share information to comply with laws.\n' +
      '  - We may share information to respond to lawful requests and legal processes.\n' +
      '  - We may share information to protect the rights and property of QUOKKA INC, our agents, customers, and others. This includes enforcing our agreements, policies, and terms of use.\n' +
      '  - We may share information in an emergency. This includes protecting the safety of our employees and agents, our customers, or any person.\n' +
      '- We may share information with those who need it to do work for us.\n' +
      '\n' +
      'We may also share aggregated and/or anonymized data with others for their own uses.\n' +
      '\n' +
      '**CHILDREN’S PRIVACY**\n' +
      '\n' +
      'Our services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.\n' +
      '\n' +
      '**INFORMATION CHOICES AND CHANGES**\n' +
      '\n' +
      'Our marketing emails tell you how to “opt-out.” If you opt out, we may still send you non-marketing emails. Non-marketing emails include emails about your accounts and our business dealings with you.\n' +
      '\n' +
      'You may send requests about personal information to our Contact Information below. You can request to change contact choices, opt-out of our sharing with others, and update your personal information.\n' +
      '\n' +
      'You can typically remove and reject cookies from our Site with your browser settings. Many browsers are set to accept cookies until you change your settings. If you remove or reject our cookies, it could affect how our Site works for you. \n' +
      '\n' +
      '**CONTACT INFORMATION**. We welcome your comments or questions about this privacy policy. \n' +
      '\n' +
      '**CHANGES TO THIS PRIVACY POLICY**. We may change this privacy policy. If we make any changes, we will change the Last Updated date above. Your continued use of the Site after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.\n' +
      '\n' +
      '\n';
  }

  getHeader() {
    return <span>Privacy Policy</span>;
  }

  getBody() {
    return (
      <div id="ppBoddy">
        <div className="modal-scroll-container">
          <QuokkaMarkdown source={this.pp}/>
        </div>
      </div>
    );
  }

  getFooter() {
    return <ModalAction1Btn onClick={this.close} text="Close" classes={['legal']}/>;
  }

  getClasses() {
    return 'no-header-bb';
  }
}

export default PrivacyPolicyModal;