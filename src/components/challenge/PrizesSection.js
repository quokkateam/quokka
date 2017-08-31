import React, { Component } from 'react';

import Prize from './Prize';
import Session from  '../../utils/Session';

class PrizesSection extends Component {
  
  constructor(props) {
    super(props);
    this.getPrizes = this.getPrizes.bind(this);
    this.getNewPrizeBtn = this.getNewPrizeBtn.bind(this);
    this.onNewPrizeClick = this.onNewPrizeClick.bind(this);
    this.onEditPrize = this.onEditPrize.bind(this);
    this.onRemovePrize = this.onRemovePrize.bind(this);
  }
  
  getPrizes() {
    var editable = Session.isAdmin();
    var prizes = this.props.prizes || [];

    if (editable) {
      return prizes.map((data) => {
        return <li key={data.sponsor.id}>
          <Prize sponsor={data.sponsor} prize={data.prize} editable={true} onEdit={this.onEditPrize} onRemove={this.onRemovePrize}/>
        </li>;
      });
    }

    return prizes.map((data) => {
      return <li key={data.sponsor.id}>
        <a href={data.sponsor.url} target="_blank" rel="noopener noreferrer">
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

  onNewPrizeClick() {
    console.log('Show modal!');
  }

  onEditPrize(prize, sponsor) {
    console.log('edit', prize, sponsor);
  }

  onRemovePrize(prize, sponsor) {
    console.log('remove', prize, sponsor);
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Prizes</div>
          <div className="challenge-section-desc">
            Participants of this week’s challenge will earn <span className="featured">{this.props.points} Quokka points</span> and be eligible for the following prizes:
          </div>
          <ul className="prizes">{this.getPrizes()}</ul>
          {this.getNewPrizeBtn()}
        </div>
      </div>
    );
  }
}

export default PrizesSection;
