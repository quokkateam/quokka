import React, { Component } from 'react';
import $ from 'jquery';

class PrizeWinnerListItem extends Component {

  constructor(props) {
    super(props);

    this.getSelectButton = this.getSelectButton.bind(this);
    this.getWinnersList = this.getWinnersList.bind(this);
    this.curateWinnersList = this.curateWinnersList.bind(this);
    this.onSelectWinners = this.onSelectWinners.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  getSelectButton(winners, disabled, noPrizes) {
    if (disabled) {
      return;
    }

    if (noPrizes) {
      return <div className="no-prizes-msg">No prizes yet</div>;
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
    var user, prize, sponsor;

    return winners.map((w, i) => {
      user = w.user;
      prize = w.prize;
      sponsor = w.sponsor;

      return <li key={i} className="winner">
        <img src={sponsor.logo} alt=""/>
        <div className="sp-name">{prize.name + ' (' + sponsor.name + ') '}&nbsp;&nbsp;&mdash;&nbsp;&nbsp;&nbsp;</div>
        <div className="winner-user">{user.name + ' (' + user.email + ')'}</div>
      </li>;
    });
  }

  onSelectWinners(e) {
    var $target = $(e.target);

    if ($target.hasClass('clicked')) {
      return;
    }

    $(e.target).addClass('clicked');

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
    const noPrizes = this.props.noPrizesYet;

    return (
      <div className={this.getClasses(disabled)}>
        <div className="pw-challenge-info">
          <div className="challenge-name">{this.props.challenge.name}</div>
          {this.getSelectButton(winners, disabled, noPrizes)}
        </div>
        {this.getWinnersList(winners, disabled)}
      </div>
    );
  }
}

export default PrizeWinnerListItem;