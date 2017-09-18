import React from 'react';
import $ from 'jquery';
import FormInput from '../shared/form/FormInput';
import ModalAction1Btn from './ModalAction1Btn';
import QuokkaModal from '../shared/QuokkaModal';

class CreateSponsorModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.setLogoContainerRef = this.setLogoContainerRef.bind(this);
    this.createSponsor = this.createSponsor.bind(this);
    this.setNameInputRef = this.setNameInputRef.bind(this);
    this.setUrlInputRef = this.setUrlInputRef.bind(this);
    this.setFileInputRef = this.setFileInputRef.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onUploadImageClick = this.onUploadImageClick.bind(this);
    this.getLogoClasses = this.getLogoClasses.bind(this);

    this.state = {
      showModal: false,
      logo: null,
      sending: false
    };
  }

  setLogoContainerRef(ref) {
    this.logoContainer = ref;
  }

  setNameInputRef(ref) {
    this.nameInput = ref;
  }

  setUrlInputRef(ref) {
    this.urlInput = ref;
  }

  setFileInputRef(ref) {
    this.fileInput = ref;
  }

  createSponsor() {
    var nameValid = this.nameInput.isValid();
    var logoValid = !!this.state.logo;

    if (!logoValid) {
      $(this.logoContainer).addClass('invalid');
    }

    if (!nameValid || !logoValid) {
      return;
    }

    var payload = {
      logo: this.state.logo,
      name: this.nameInput.serialize(),
      url: this.urlInput.serialize()
    };

    this.setState({ sending: true });

    if (this.props.onCreateSponsor) {
      this.props.onCreateSponsor(payload);
    }
  }

  onUploadImageClick() {
    $(this.fileInput).click();
  }

  onImageChange () {
    $(this.logoContainer).removeClass('invalid');

    const file = this.fileInput.files[0];

    if (!file) {
      return;
    }

    const fr = new FileReader();
    fr.onload = () => { this.setState({ logo: fr.result }); };
    fr.readAsDataURL(file);
  }

  getLogoClasses() {
    var classes = ['logo-container'];

    if (this.state.logo) {
      classes.push('has-image');
    }

    return classes.join(' ');
  }

  getBody() {
    return (
      <div id="createSponsorModalBody">
        <div className="upload-logo-container">
          <div className={this.getLogoClasses()} ref={this.setLogoContainerRef}>
            <img className="logo" src={this.state.logo} alt=""/>
          </div>
          <input type="file" accept="image/png, image/jpg, image/jpeg" className="no-display" onChange={this.onImageChange} ref={this.setFileInputRef}/>
          <i className="upload-logo-btn fa fa-upload" onClick={this.onUploadImageClick}></i>
        </div>
        <FormInput required={true} placeholder="Sponsor Name" ref={this.setNameInputRef}/>
        <FormInput placeholder="Sponsor URL" ref={this.setUrlInputRef}/>
      </div>
    );
  }

  getFooter() {
    return <ModalAction1Btn sending={this.state.sending} onClick={this.createSponsor} text="Create Sponsor"/>;
  }
}

export default CreateSponsorModal;