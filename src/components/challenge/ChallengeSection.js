import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import FormInput from '../shared/form/FormInput';
import QuokkaMarkdown from '../shared/QuokkaMarkdown';
import Session from '../../utils/Session';

const status = {
  STATIC: 0,
  EDITING: 1,
  SAVING: 2
};

class ChallengeSection extends Component {

  constructor(props) {
    super(props);

    this.setChallengeRef = this.setChallengeRef.bind(this);
    this.setPointsRef = this.setPointsRef.bind(this);
    this.getModBtn = this.getModBtn.bind(this);
    this.onModBtnClick = this.onModBtnClick.bind(this);
    this.saveChallenge = this.saveChallenge.bind(this);
    this.isEditing = this.isEditing.bind(this);
    this.isSaving = this.isSaving.bind(this);
    this.challengeContent = this.challengeContent.bind(this);
    this.getPoints = this.getPoints.bind(this);

    this.state = {
      status: status.STATIC,
      challenge: this.props.challenge || {},
      challengeId: null
    };
  }

  setChallengeRef(ref) {
    this.challenge = ref;
  }

  setPointsRef(ref) {
    this.points = ref;
  }

  componentDidUpdate() {
    if (this.state.status === status.SAVING) {
      this.saveChallenge();
    }
  }

  getModBtn() {
    if (!Session.isAdmin()) {
      return;
    }

    var classes = ['mod-btn', 'fa'];

    switch (this.state.status) {
    case status.STATIC:
      classes.push('fa-pencil');
      classes.push('edit');
      break;
    case status.EDITING:
      classes.push('fa-save');
      classes.push('save');
      break;
    case status.SAVING:
      classes.push('fa-save');
      classes.push('save');
      classes.push('saving');
      break;
    default:
      classes.push('fa-pencil');
      classes.push('edit');
    }

    return <i className={classes.join(' ')} onClick={this.onModBtnClick}></i>;
  }

  onModBtnClick() {
    switch (this.state.status) {
    case status.STATIC:
      this.setState({ status: status.EDITING });
      break;
    case status.EDITING:
      var points;

      try {
        points = Number(this.points.serialize());
      } catch (e) {
        points = 0;
      }

      this.setState({
        status: status.SAVING,
        challenge: {
          text: this.challenge.serialize(),
          points: points
        }
      });
      break;
    default:
      // Do nothing
    }
  }

  saveChallenge() {
    var payload = {
      id: this.state.challengeId,
      text: this.state.challenge.text,
      points: this.state.challenge.points
    };

    Ajax.put('/api/challenge/challenge', payload)
      .then((resp) => resp.json())
      .then((data) => {
        if (data && data.hasOwnProperty('text') && data.hasOwnProperty('points')) {
          this.setState({
            status: status.STATIC,
            challenge: data
          });

          if (this.props.onUpdate) {
            this.props.onUpdate(data);
          }
        }
      });
  }

  isEditing() {
    return Session.isAdmin() && this.state.status === status.EDITING;
  }

  isSaving() {
    return Session.isAdmin() && this.state.status === status.SAVING;
  }

  challengeContent() {
    var text = this.state.challenge.text || '';
    var isSaving = this.isSaving();

    if (isSaving || this.isEditing()) {
      return <FormInput useTextarea={true} disabled={isSaving} placeholder="What's this week's challenge?" defaultValue={text} ref={this.setChallengeRef} />;
    } else if (text) {
      return <QuokkaMarkdown source={text} />;
    } else {
      return <div className="no-challenge">No challenge specified</div>;
    }
  }

  getPoints() {
    var points = this.state.challenge.points || 0;
    var isSaving = this.isSaving();

    if (isSaving || this.isEditing()) {
      return <span className="point-count"><FormInput defaultValue={points} disabled={isSaving} ref={this.setPointsRef}/></span>;
    }

    return <span className="point-count">{points}</span>;
  }

  render() {
    return (
      <div className="container-fluid challenge-card">
        {this.getModBtn()}
        <div className="row">
          <div className="challenge-card-header">
            <div className="challenge-section-title">Challenge of the Week</div>
            <div className="points">
              <img src="https://s3-us-west-1.amazonaws.com/quokkadev/images/leaf.png" alt="" />
              {this.getPoints()}
            </div>
          </div>
          <div className="challenge-card-body">{this.challengeContent()}</div>
        </div>
      </div>
    );
  }
}

export default ChallengeSection;