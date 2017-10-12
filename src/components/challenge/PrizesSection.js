import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import CreateSponsorModal from '../modals/CreateSponsorModal';
import NewPrizeModal from '../modals/NewPrizeModal';
import Prize from './Prize';
import RemovePrizeModal from '../modals/RemovePrizeModal';
import Session from  '../../utils/Session';

class PrizesSection extends Component {
  
  constructor(props) {
    super(props);
    this.getPrizes = this.getPrizes.bind(this);
    this.getNewPrizeBtn = this.getNewPrizeBtn.bind(this);
    this.onNewPrizeClick = this.onNewPrizeClick.bind(this);
    this.onEditPrize = this.onEditPrize.bind(this);
    this.onRemovePrize = this.onRemovePrize.bind(this);
    this.setNewPrizeModalRef = this.setNewPrizeModalRef.bind(this);
    this.setRemovePrizeModalRef = this.setRemovePrizeModalRef.bind(this);
    this.setCreateSponsorModalRef = this.setCreateSponsorModalRef.bind(this);
    this.removePrize = this.removePrize.bind(this);
    this.createPrize = this.createPrize.bind(this);
    this.updatePrize = this.updatePrize.bind(this);
    this.updateListWith = this.updateListWith.bind(this);
    this.onCreateSponsorClick = this.onCreateSponsorClick.bind(this);
    this.getCreateSponsorBtn = this.getCreateSponsorBtn.bind(this);
    this.createSponsor = this.createSponsor.bind(this);
    this.showCreateNewSponsor = this.showCreateNewSponsor.bind(this);

    this.state = {
      challengeId: null,
      prizes: this.props.prizes || [],
      sponsors: this.props.sponsors || [],
      points: this.props.points || 0,
      closeModals: false
    };
  }

  componentDidUpdate() {
    if (this.state.closeModals) {
      this.removePrizeModal.close();
      this.newPrizeModal.close();
    }

    return true;
  }

  setNewPrizeModalRef(ref) {
    this.newPrizeModal = ref;
  }

  setRemovePrizeModalRef(ref) {
    this.removePrizeModal = ref;
  }

  setCreateSponsorModalRef(ref) {
    this.createSponsorModal = ref;
  }

  getPrizes() {
    if (this.state.prizes.length === 0) {
      return <div className="no-prizes">No prizes yet</div>;
    }

    if (Session.isAdmin()) {
      return this.state.prizes.map((data) => {
        return <li key={data.prize.id}>
          <Prize sponsor={data.sponsor} prize={data.prize} editable={true} onEdit={this.onEditPrize} onRemove={this.onRemovePrize}/>
        </li>;
      });
    }

    var href, className;
    return this.state.prizes.map((data) => {
      /*eslint-disable no-script-url*/
      href = data.sponsor.url || 'javascript:void(0)';
      className = data.sponsor.url ? null : 'no-link';

      return <li key={data.prize.id}>
        <a className={className} href={href} target="_blank" rel="noopener noreferrer">
          <Prize sponsor={data.sponsor} prize={data.prize}/>
        </a>
      </li>;
    });
  }

  getNewPrizeBtn() {
    if (!Session.isAdmin()) {
      return;
    }

    return <div className="new-prize-btn" onClick={this.onNewPrizeClick}>Add New Prize</div>;
  }

  getCreateSponsorBtn () {
    if (!Session.isAdmin()) {
      return;
    }

    return <div className="create-sponsor-btn" onClick={this.onCreateSponsorClick}>Create New Sponsor</div>;
  }

  onCreateSponsorClick() {
    this.createSponsorModal.updateAndShow();
  }

  createSponsor(payload) {
    Ajax.post('/api/sponsor', payload)
      .then((resp) => resp.json())
      .then((sponsors) => {
        this.setState({ sponsors: sponsors });

        this.createSponsorModal.close();

        setTimeout(() => {
          this.createSponsorModal.setState({ sending: false });
        }, 300);
      });
  }

  onNewPrizeClick() {
    this.newPrizeModal.updateAndShow({
      prize: null,
      sponsors: this.state.sponsors,
      selectedSponsor: null,
      newPrize: true
    });
  }

  onEditPrize(prize, sponsor) {
    this.newPrizeModal.updateAndShow({
      prize: prize,
      sponsors: this.state.sponsors,
      selectedSponsor: sponsor.id,
      newPrize: false
    });
  }

  onRemovePrize(prize) {
    this.removePrizeModal.updateAndShow({
      prize: prize
    });
  }

  removePrize(payload) {
    this.updateListWith(payload, 'delete');
  }

  createPrize(payload) {
    this.updateListWith(payload, 'post');
  }

  updatePrize(payload) {
    this.updateListWith(payload, 'put');
  }

  updateListWith(payload, method) {
    payload.challengeId = this.state.challengeId;

    Ajax[method]('/api/prize', payload)
      .then((resp) => resp.json())
      .then((prizes) => {
        this.setState({ prizes: prizes, closeModals: true });
      });
  }

  showCreateNewSponsor() {
    this.newPrizeModal.close();

    setTimeout(() => {
      this.createSponsorModal.updateAndShow();
    }, 400);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Prizes</div>
          <div className="challenge-section-desc">
            Participants of this week’s challenge will earn <span className="featured">{this.state.points} Quokka points</span> and be eligible for the following prizes:
          </div>
          <ul className="prizes">{this.getPrizes()}</ul>
          {this.getNewPrizeBtn()}
          {this.getCreateSponsorBtn()}
        </div>
        <NewPrizeModal onCreatePrize={this.createPrize} onUpdatePrize={this.updatePrize} onCreateNewSponsor={this.showCreateNewSponsor} ref={this.setNewPrizeModalRef}/>
        <RemovePrizeModal onRemovePrize={this.removePrize} ref={this.setRemovePrizeModalRef}/>
        <CreateSponsorModal onCreateSponsor={this.createSponsor} ref={this.setCreateSponsorModalRef} />
      </div>
    );
  }
}

export default PrizesSection;
