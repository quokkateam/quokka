import React from 'react';

import FormInput from '../shared/form/FormInput';
import ModalAction1Btn from './ModalAction1Btn';
import QuokkaModal from '../shared/QuokkaModal';

class CreateSponsorModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.createSponsor = this.createSponsor.bind(this);
    this.setNameInputRef = this.setNameInputRef.bind(this);
    this.setUrlInputRef = this.setUrlInputRef.bind(this);

    this.state = {
      showModal: false,
    };
  }

  setNameInputRef(ref) {
    this.nameInput = ref;
  }

  setUrlInputRef(ref) {
    this.urlInput = ref;
  }

  createSponsor() {
    var payload = {
      logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/lululemon.png', // deal with this through file upload
      name: this.nameInput.serialize(),
      url: this.urlInput.serialize()
    };

    if (this.props.onCreateSponsor) {
      this.props.onCreateSponsor(payload);
    }
  }

  getBody() {
    return (
      <div id="createSponsorModalBody">
        <div className="upload-logo-container">
          <div className="logo-container">
            <img className="logo" alt=""/>
          </div>
          <i className="upload-logo-btn fa fa-upload"></i>
        </div>
        <FormInput required={true} placeholder="Sponsor Name" ref={this.setNameInputRef}/>
        <FormInput placeholder="Sponsor URL" ref={this.setUrlInputRef}/>
      </div>
    );
  }

  getFooter() {
    return <ModalAction1Btn onClick={this.createSponsor} text="Create Sponsor"/>;
  }
}

export default CreateSponsorModal;