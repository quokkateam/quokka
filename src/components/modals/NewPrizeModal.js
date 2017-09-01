import React from 'react';

import Ajax from '../../utils/Ajax';
import FormInput from '../shared/form/FormInput';
import FormSelect from '../shared/form/FormSelect';
import ModalAction1Btn from './ModalAction1Btn';
import QuokkaModal from '../shared/QuokkaModal';

class NewPrizeModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.setSponsorSelectRef = this.setSponsorSelectRef.bind(this);
    this.setPrizeInputRef = this.setPrizeInputRef.bind(this);
    this.formatSponsorSelectOptions = this.formatSponsorSelectOptions.bind(this);
    this.submitPrize = this.submitPrize.bind(this);
    this.createPrize = this.createPrize.bind(this);
    this.updatePrize = this.updatePrize.bind(this);

    this.state = {
      showModal: false,
      prize: this.props.prize,
      sponsors: this.props.sponsors,
      selectedSponsor: this.props.selectedSponsor,
      newPrize: true
    };
  }

  setSponsorSelectRef(ref) {
    this.sponsorSelect = ref;
  }

  setPrizeInputRef(ref) {
    this.prizeInput = ref;
  }

  formatSponsorSelectOptions() {
    return (this.state.sponsors || []).map((s) => {
      return { value: s.id, title: s.name };
    }).sort((a, b) => {
      return ~~(a.title > b.title);
    });
  }

  submitPrize() {
    this.state.newPrize ? this.createPrize() : this.updatePrize();
  }

  createPrize() {
    if (!this.props.onCreatePrize) {
      return;
    }

    var payload = {
      sponsorId: this.sponsorSelect.serialize(),
      text: this.prizeInput.serialize()
    };

    this.props.onCreatePrize(payload);
  }

  updatePrize() {
    if (!this.props.onUpdatePrize) {
      return;
    }

    var payload = {
      sponsorId: this.sponsorSelect.serialize(),
      id: this.state.prize.id,
      text: this.prizeInput.serialize()
    };

    this.props.onUpdatePrize(payload);
  }

  getBody() {
    return (
      <div id="newPrizeModalBody">
        <div className="select-sponsor">
          <FormSelect required={true} placeholder="Select Sponsor" options={this.formatSponsorSelectOptions()} defaultValue={this.state.selectedSponsor} ref={this.setSponsorSelectRef}/>
        </div>
        <div className="prize-section">
          <FormInput required={true} placeholder="Name of Prize" defaultValue={(this.state.prize || {}).text} ref={this.setPrizeInputRef} />
        </div>
      </div>
    );
  }

  getFooter() {
    return <ModalAction1Btn onClick={this.submitPrize} text={this.state.newPrize ? 'Add New Prize' : 'Update Prize'}/>;
  }
}

export default NewPrizeModal;