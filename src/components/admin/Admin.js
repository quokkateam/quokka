import React, { Component } from 'react';
import HashNavContainer from '../shared/hash-nav/HashNavContainer';
import PrizeWinners from './PrizeWinners';
import Session from '../../utils/Session';
import WeeklyEmails from './WeeklyEmails';

class Admin extends Component {

  constructor(props) {
    super(props);

    if (!Session.isAdmin()) {
      window.location = '/';
    }

    this.links = [
      {
        hash: 'emails',
        title: 'Weekly Emails',
        comp: <WeeklyEmails/>
      },
      {
        hash: 'winners',
        title: 'Prize Winners',
        comp: <PrizeWinners/>
      }
    ];
  }

  render() {
    if (!Session.isAdmin()) {
      return (<div style={{ minHeight: 1100 }}></div>);
    }

    return (
      <div id="admin">
        <HashNavContainer links={this.links}/>
      </div>
    );
  }
}

export default Admin;