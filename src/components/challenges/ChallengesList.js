import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import ChallengesListItem from './ChallengesListItem';
import DraggableList from 'react-draggable-list';
import DateInput from '../shared/form/DateInput';
import Session from '../../utils/Session';


class ChallengesList extends Component {

  constructor(props) {
    super(props);

    this.status = {
      STATIC: 0,
      EDITING: 1,
      SERIALIZING: 2,
      SENDING: 3
    };

    this.setDraggableContainerRef = this.setDraggableContainerRef.bind(this);
    this.setStartDateRef = this.setStartDateRef.bind(this);
    this.getChallenges = this.getChallenges.bind(this);
    this.getSpinner = this.getSpinner.bind(this);
    this.getList = this.getList.bind(this);
    this.getModBtn = this.getModBtn.bind(this);
    this.getChallengesListClasses = this.getChallengesListClasses.bind(this);
    this.edit = this.edit.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.serialize = this.serialize.bind(this);
    this.save = this.save.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.formatChallenges = this.formatChallenges.bind(this);

    this.state = {
      challenges: this.props.challenges || [],
      status: this.status.STATIC
    };
  }

  componentDidMount() {
    Ajax.get('/api/challenges')
      .then((resp) => resp.json())
      .then((data) => {
        var challenges = this.formatChallenges(data);
        this.setState({ challenges: challenges });
      });

    return true;
  }

  formatChallenges(data) {
    var weekNum;
    var isAdmin = Session.isAdmin();

    return (data.challenges || []).map((c, i) => {
      weekNum = i + 1;

      if (weekNum === data.weekNum) {
        c.currentWeek = true;
      } else if (weekNum > data.weekNum && !isAdmin) {
        c.disabled = true;
      }

      return c;
    });
  }

  componentDidUpdate() {
    switch (this.state.status) {
    case this.status.SERIALIZING:
      this.serialize();
      break;
    case this.status.SENDING:
      this.save();
      break;
    default:
      break;
    }
  }

  setDraggableContainerRef(ref) {
    this.draggableContainer = ref;
  }

  setStartDateRef(ref) {
    this.startDate = ref;
  }

  getChallenges() {
    return this.state.challenges.map((c) => {
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

  getModBtn() {
    if (!Session.isAdmin()) {
      return;
    }

    switch (this.state.status) {
    case this.status.STATIC:
      return <i className="fa fa-pencil-square-o edit-challenges" onClick={this.edit}></i>;
    case this.status.EDITING:
      return <i className="fa fa-save save-challenges" onClick={this.onSaveClick}></i>;
    case this.status.SERIALIZING:
      return <i className="fa fa-save save-challenges disabled"></i>;
    case this.status.SENDING:
      return <i className="fa fa-save save-challenges disabled"></i>;
    default:
      console.warn('Status not recognized...');
      return;
    }
  }

  edit() {
    this.setState({ status: this.status.EDITING });
  }

  onSaveClick() {
    this.setState({ status: this.status.SERIALIZING });
  }

  serialize() {
    if (!this.startDate.isValid()) {
      this.setState({ status: this.status.EDITING });
      return;
    }

    this.setState({
      startDate: this.startDate.serialize(),
      status: this.status.SENDING
    });
  }

  save() {
    const payload = {
      challenges: this.state.challenges,
      startDate: this.state.startDate
    };

    Ajax.put('/api/challenges', payload)
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((data) => {
            var challenges = this.formatChallenges(data);

            this.setState({
              challenges: challenges,
              startDate: challenges[0].startDate,
              status: this.status.STATIC
            });
          });
        }
      });
  }

  getList() {
    if (this.state.status === this.status.EDITING) {
      return <DraggableList list={this.state.challenges} itemKey="slug" template={ChallengesListItem} container={() => this.draggableContainer} onMoveEnd={this.onMoveEnd} />;
    }

    return <ul className={this.getChallengesListClasses()}>{this.getChallenges()}</ul>;
  }

  onMoveEnd(challenges) {
    this.setState({ challenges: challenges });
  }

  getStartDate() {
    if (this.state.status === this.status.STATIC) {
      return;
    }

    return <div className="edit-challenge-date">
      <span className="start-date-lead-text">Start Date:</span>
      <DateInput required={true} format="MM/DD/YY" classes={['start-date']} defaultValue={this.state.challenges[0].startDate} disabled={this.state.status !== this.status.EDITING} ref={this.setStartDateRef} />
    </div>;
  }

  render() {
    return (
      <div className="challenges-list-container">
        <div className="challenges-list-intro">
          <div className="intro-title">Weekly Challenges</div>
          <div className="intro-subtitle">Check out the weekly challenge breakdown below. Each week introduces a separate healthy habit for you and your friends to participate in and earn points for doing so.</div>
          {this.getModBtn()}
        </div>
        {this.getStartDate()}
        <div className="draggable-challenges-container" ref={this.setDraggableContainerRef}>
          {this.getList()}
        </div>
        {this.getSpinner()}
      </div>
    );
  }
}

export default ChallengesList;