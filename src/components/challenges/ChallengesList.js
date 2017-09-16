import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import ChallengesListItem from './ChallengesListItem';

class ChallengesList extends Component {

  constructor(props) {
    super(props);

    this.getChallenges = this.getChallenges.bind(this);
    this.getSpinner = this.getSpinner.bind(this);
    this.getChallengesListClasses = this.getChallengesListClasses.bind(this);

    this.state = {
      challenges: this.props.challenges || [],
      weekNum: null
    };
  }

  componentDidMount() {
    Ajax.get('/api/challenges')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          challenges: data.challenges,
          weekNum: data.weekNum
        });
      });

    return true;
  }

  getChallenges() {
    return this.state.challenges.map((c, i) => {
      return <li key={c.slug}><ChallengesListItem challenge={c} weekNum={i + 1} currWeekNum={this.state.weekNum}/></li>;
    });
  }

  getSpinner() {
    if (this.state.challenges.length === 0) {
      return <div className="circle-fade-spinner primary"></div>;
    } else {
      return;
    }
  }

  getChallengesListClasses() {
    var classes = ['challenges-list'];

    if (this.state.challenges.length === 0) {
      classes.push('no-children');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <div className="challenges-list-container">
        <div className="challenges-list-intro">
          <div className="intro-title">Weekly Challenges</div>
          <div className="intro-subtitle">Check out the weekly challenge breakdown below. Each week introduces a separate healthy habit for you and your friends to participate in and earn points for doing so.</div>
        </div>
        <ul className={this.getChallengesListClasses()}>{this.getChallenges()}</ul>
        {this.getSpinner()}
      </div>
    );
  }
}

export default ChallengesList;