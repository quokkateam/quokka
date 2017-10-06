import React, { Component } from 'react';

class PrizeWinnerListItem extends Component {

  constructor(props) {
    super(props);

    this.getSelectButton = this.getSelectButton.bind(this);
    this.getWinnersList = this.getWinnersList.bind(this);
    this.curateWinnersList = this.curateWinnersList.bind(this);
    this.onSelectWinners = this.onSelectWinners.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  getSelectButton(winners, disabled) {
    if (disabled) {
      return;
    }

    if (winners.length > 0) {
      return <div className="winners-selected-status"><div className="check"></div><span>Winners Selected</span></div>;
    }

    return <button className="choose-winners" onClick={this.onSelectWinners}>Choose Winners</button>;
  }

  getWinnersList(winners, disabled) {
    if (disabled || winners.length === 0) {
      return;
    }

    return <ul className="winners-list">{this.curateWinnersList(winners)}</ul>;
  }

  curateWinnersList(winners) {
    return winners.map((w, i) => {
      return <li key={i} className="winner">{w.name + ' (' + w.email + ')'}</li>;
    });
  }

  onSelectWinners() {
    if (this.props.onSelectWinners) {
      this.props.onSelectWinners(this.props.challenge.id);
    }
  }

  getClasses(disabled) {
    var classes = ['prize-winner-list-item'];

    if (disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  render() {
    const disabled = this.props.disabled;
    const winners = this.props.winners;

    return (
      <div className={this.getClasses(disabled)}>
        <div className="pw-challenge-info">
          <div className="challenge-name">{this.props.challenge.name}</div>
          {this.getSelectButton(winners, disabled)}
        </div>
        {this.getWinnersList(winners, disabled)}
      </div>
    );
  }
}

export default PrizeWinnerListItem;