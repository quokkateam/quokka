import React from 'react';

// import Ajax from '../../utils/Ajax';
import FormInput from '../shared/form/FormInput';
import FormSelect from '../shared/form/FormSelect';
import ModalAction1Btn from './ModalAction1Btn';
import QuokkaModal from '../shared/QuokkaModal';

class NewPrizeModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.newSponsorVal = 'create-new-sponsor';

    this.setSponsorSelectRef = this.setSponsorSelectRef.bind(this);
    this.setPrizeInputRef = this.setPrizeInputRef.bind(this);
    this.formatSponsorSelectOptions = this.formatSponsorSelectOptions.bind(this);
    this.submitPrize = this.submitPrize.bind(this);
    this.createPrize = this.createPrize.bind(this);
    this.updatePrize = this.updatePrize.bind(this);
    this.onSponsorChange = this.onSponsorChange.bind(this);
    this.isValid = this.isValid.bind(this);

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
    var options = (this.state.sponsors || []).map((s) => {
      return { value: s.id, title: s.name };
    }).sort((a, b) => {
      return ~~(a.title > b.title);
    });

    options.push({ value: this.newSponsorVal, title: '+ Create New Sponsor' });

    return options;
  }

  submitPrize() {
    this.state.newPrize ? this.createPrize() : this.updatePrize();
  }

  createPrize() {
    if (!this.props.onCreatePrize || !this.isValid()) {
      return;
    }

    var payload = {
      sponsorId: Number(this.sponsorSelect.serialize()),
      name: this.prizeInput.serialize()
    };

    this.props.onCreatePrize(payload);
  }

  updatePrize() {
    if (!this.props.onUpdatePrize || !this.isValid()) {
      return;
    }

    var payload = {
      id: Number(this.state.prize.id),
      sponsorId: Number(this.sponsorSelect.serialize()),
      name: this.prizeInput.serialize()
    };

    this.props.onUpdatePrize(payload);
  }

  isValid() {
    var sponsorValid = this.sponsorSelect.isValid();
    var nameValid = this.prizeInput.isValid();

    return sponsorValid && nameValid;
  }

  onSponsorChange(val) {
    if (val === this.newSponsorVal && this.props.onCreateNewSponsor) {
      this.props.onCreateNewSponsor();
    }
  }

  getBody() {
    return (
      <div id="newPrizeModalBody">
        <div className="select-sponsor">
          <FormSelect required={true} placeholder="Select Sponsor" options={this.formatSponsorSelectOptions()} defaultValue={this.state.selectedSponsor} onChange={this.onSponsorChange} ref={this.setSponsorSelectRef}/>
        </div>
        <div className="prize-section">
          <FormInput required={true} placeholder="Name of Prize" defaultValue={(this.state.prize || {}).name} ref={this.setPrizeInputRef} />
        </div>
      </div>
    );
  }

  getFooter() {
    return <ModalAction1Btn onClick={this.submitPrize} text={this.state.newPrize ? 'Add Prize' : 'Update Prize'}/>;
  }
}

export default NewPrizeModal;