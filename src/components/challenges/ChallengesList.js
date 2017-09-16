import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import ChallengesListItem from './ChallengesListItem';
import DraggableList from 'react-draggable-list';
import Session from '../../utils/Session';


class ChallengesList extends Component {

  constructor(props) {
    super(props);

    this.setDraggableContainerRef = this.setDraggableContainerRef.bind(this);
    this.getChallenges = this.getChallenges.bind(this);
    this.getSpinner = this.getSpinner.bind(this);
    this.edit = this.edit.bind(this);
    this.getList = this.getList.bind(this);
    this.getEditBtn = this.getEditBtn.bind(this);
    this.getChallengesListClasses = this.getChallengesListClasses.bind(this);

    this.state = {
      challenges: this.props.challenges || []
    };
  }

  componentDidMount() {
    Ajax.get('/api/challenges')
      .then((resp) => resp.json())
      .then((data) => {
        var weekNum;
        var isAdmin = Session.isAdmin();

        var challenges = (data.challenges || []).map((c, i) => {
          weekNum = i + 1;

          if (weekNum == data.weekNum) {
            c.currentWeek = true;
          } else if (weekNum > data.weekNum && !isAdmin) {
            c.disabled = true;
          }

          return c;
        });

        this.setState({ challenges: challenges });
      });

    return true;
  }

  setDraggableContainerRef(ref) {
    this.draggableContainer = ref;
  }

  getChallenges() {
    return this.state.challenges.map((c, i) => {
      return <li key={c.slug}><ChallengesListItem item={c}/></li>;
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

  getEditBtn() {
    if (!Session.isAdmin()) {
      return;
    }

    return <i className="fa fa-pencil-square-o edit-challenges" onClick={this.edit}></i>;
  }

  edit() {
    this.setState({ editing: true });
  }

  getList() {
    if (this.state.editing) {
      return <DraggableList list={this.state.challenges} itemKey="slug" template={ChallengesListItem} container={() => this.draggableContainer} />;
    }

    return <ul className={this.getChallengesListClasses()}>{this.getChallenges()}</ul>;
  }

  render() {
    return (
      <div className="challenges-list-container">
        <div className="challenges-list-intro">
          <div className="intro-title">Weekly Challenges</div>
          <div className="intro-subtitle">Check out the weekly challenge breakdown below. Each week introduces a separate healthy habit for you and your friends to participate in and earn points for doing so.</div>
          {this.getEditBtn()}
        </div>
        <div className="draggable-challenges-container" ref={this.setDraggableContainerRef}>
          {this.getList()}
        </div>
        {this.getSpinner()}
      </div>
    );
  }
}

export default ChallengesList;