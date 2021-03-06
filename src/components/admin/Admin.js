import React, { Component } from 'react';
import CheckInResponses from './CheckInResponses';
import Downloads from './Downloads';
import HashNavContainer from '../shared/hash-nav/HashNavContainer';
import PrizeWinners from './PrizeWinners';
import Session from '../../utils/Session';

class Admin extends Component {

  constructor(props) {
    super(props);

    if (!Session.isAdmin()) {
      window.location = '/challenges';
    }

    this.links = [
      // Can bring back when there's something actually valuable to modify in the emails
      // {
      //   hash: 'emails',
      //   title: 'Weekly Emails',
      //   comp: <WeeklyEmails/>
      // },
      {
        hash: 'winners',
        title: 'Prize Winners',
        comp: <PrizeWinners/>
      },
      {
        hash: 'responses',
        title: 'Check-in Responses',
        comp: <CheckInResponses/>
      },
      {
        hash: 'downloads',
        title: 'Downloads',
        comp: <Downloads/>
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