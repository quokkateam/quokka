import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import PrizeWinnerListItem from './PrizeWinnerListItem';

class PrizeWinners extends Component {

  constructor(props) {
    super(props);

    this.selectWinners = this.selectWinners.bind(this);
    this.populatePrizeWinnersList = this.populatePrizeWinnersList.bind(this);

    this.state = {
      winners: this.props.winners || [],
      launched: false,
      weekNum: null
    };
  }

  componentDidMount() {
    Ajax.get('/api/winners')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(data);
      });

    return true;
  }

  selectWinners(challengeId) {
    Ajax.post('/api/winners', { challenge_id: challengeId })
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((data) => {
            this.setState(data);
          });
        } else {
          console.warn('Error selecting winners with status, ', resp.status);
        }
      });
  }

  populatePrizeWinnersList() {
    var disabled;

    return this.state.winners.map((data, i) => {
      if (!this.state.launched) {
        disabled = true;
      } else {
        disabled = (i + 1) > this.state.weekNum;
      }

      return <PrizeWinnerListItem key={i} challenge={data.challenge} winners={data.winners} disabled={disabled} onSelectWinners={this.selectWinners}/>;
    });
  }

  render() {
    return (
      <div id="prizeWinners">
        <div className="prize-winners-intro">
          <div className="prize-winners-title">Prize Winners</div>
          <div className="prize-winners-subtitle">Randomly select winners for the weekly challenges.</div>
        </div>
        <ul className="prize-winners-list">{this.populatePrizeWinnersList()}</ul>
      </div>
    );
  }
}

export default PrizeWinners;