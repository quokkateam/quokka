import React, { Component } from 'react';

import Prize from './Prize';
import Session from  '../../utils/Session';

class PrizesSection extends Component {
  
  constructor(props) {
    super(props);
    this.getPrizes = this.getPrizes.bind(this);
    this.getNewPrizeBtn = this.getNewPrizeBtn.bind(this);
    this.onNewPrizeClick = this.onNewPrizeClick.bind(this);
  }
  
  getPrizes() {
    return (this.props.prizes || []).map((data) => {
      return <li key={data.sponsor.id}><a href={data.sponsor.url} target="_blank" rel="noopener noreferrer"><Prize sponsor={data.sponsor} prize={data.prize}/></a></li>;
    });
  }

  getNewPrizeBtn() {
    if (!Session.isAdmin()) {
      return;
    }

    return <div className="new-prize-btn" onClick={this.onNewPrizeClick}>Add New Prize</div>;
  }

  onNewPrizeClick() {
    alert('Show modal!');
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
