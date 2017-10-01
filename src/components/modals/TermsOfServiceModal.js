import React from 'react';

import ModalAction1Btn from './ModalAction1Btn';
import QuokkaMarkdown from '../shared/QuokkaMarkdown';
import QuokkaModal from '../shared/QuokkaModal';

class TermsOfServiceModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };

    this.tos = '**Terms & Conditions**\n' +
      '**Last Updated: October 1, 2017**\n' +
      '\n' +
      'Please read these Terms and Conditions ("**Terms**", "**Terms and Conditions**") carefully before using the www.quokkachallenge.com website (the "**Service**") operated by Quokka Inc. ("**us**", "**we**", or "**our**"). \n' +
      '\n' +
      'Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, do not use the Service.\n' +
      '\n' +
      '**COPYRIGHT AND TRADEMARK INFORMATION**\n' +
      '\n' +
      'Copyright © 2017 QUOKKA INC, All rights reserved.\n' +
      '\n' +
      'This web site, and the information which it contains, is the property of Quokka Inc. and its affiliates and licensors, and is protected from unauthorized copying and dissemination by United States copyright law, trademark law, international conventions and other intellectual property laws.\n' +
      '\n' +
      '**USE OF WEBSITE AND ITS CONTENT**\n' +
      '\n' +
      'The information on this site is for general purposes only and is not intended or implied to be a substitute for professional medical advice, diagnosis, or treatment. Seek advice from a health care provider for your personal health needs. If you are dissatisfied with any Quokka Inc. material, or with any of Quokka Inc.’s Terms, your sole and exclusive remedy is to discontinue using the Service, as applicable.\n' +
      '\n' +
      'Under no circumstances, including, but not limited to, negligence, shall Quokka Inc., or its affiliates be liable for any direct, indirect, incidental, special or consequential damages that result from the use of, or the inability to use, the Service, unauthorized access to or alteration of your transmissions or data, even if advised of the possibility of such damages. You specifically acknowledge and agree that Quokka Inc. is not liable for any conduct of any user.\n' +
      '\n' +
      '**LINKS TO THIRD-PARTY WEBSITES**\n' +
      '\n' +
      'Our Service may contain links to third-party websites or services that are not owned or controlled by Quokka Inc. Quokka Inc. has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party websites or services. You further acknowledge and agree that Quokka Inc. shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.\n' +
      '\n' +
      '**CHANGES TO THE TERMS**\n' +
      '\n' +
      'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If we make any changes, we will change the Last Updated date above. Your continued use of the Site after we post any modifications to the Terms on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Terms and Conditions.\n' +
      '\n' +
      '**CONTACT US**\n' +
      '\n' +
      'If you have any questions about these Terms, please contact us.';
  }

  getHeader() {
    return <span>Terms of Service</span>;
  }

  getBody() {
    return (
      <div id="tosBody">
        <div className="modal-scroll-container">
          <QuokkaMarkdown source={this.tos}/>
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

export default TermsOfServiceModal;