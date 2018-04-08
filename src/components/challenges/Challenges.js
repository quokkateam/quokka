import React, { Component } from 'react';

import ChallengesList from './ChallengesList';
import CheckInsList from './CheckInsList';
import HashNavContainer from '../shared/hash-nav/HashNavContainer';
import Session from '../../utils/Session';
import WeeklyProgBar from '../widgets/WeeklyProgBar';

class Challenges extends Component {
  
  constructor(props) {
    super(props);

    this.getProgBar = this.getProgBar.bind(this);

    this.links = [
      {
        hash: 'challenges',
        title: 'Challenges',
        comp: <ChallengesList/>
      },
      {
        hash: 'check-ins',
        title: 'Check-ins',
        comp: <CheckInsList/>
      }
    ];
  }

  getProgBar() {
    // HACK: hiding the weekly-prog-bar just for UNC/Duke since I'm lazy and don't wanna
    // have to redo it for them and their 6-week challenge
    var schoolSlug = (Session.school() || {}).slug;
    if (schoolSlug === 'unc' || schoolSlug === 'duke-university' || schoolSlug === 'ucsb') {
      return;
    }

    return <div className="prog-bar-wrapper"><WeeklyProgBar/></div>;
  }

  render() {
    return (
      <div id="challenges">
        {this.getProgBar()}
        <HashNavContainer links={this.links}/>
      </div>
    );
  }
}

export default Challenges;