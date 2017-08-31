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

const SUCCESS_MESSAGE_DURATION = 2000;

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
      challenge: this.props.challenge || {}
    };
  }

  setChallengeRef(ref) {
    this.challenge = ref;
  }

  setPointsRef(ref) {
    this.points = ref;
  }

  getModBtn() {
    if (!Session.isAdmin()) {
      return;
    }

    var classes = ['mod-btn', 'fa'];

    switch (this.state.status) {
    case status.STATIC:
      classes.push('fa-pencil');
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
    }

    return <i className={classes.join(' ')} onClick={this.onModBtnClick}></i>;
  }

  onModBtnClick() {
    switch (this.state.status) {
    case status.STATIC:
      this.setState({ status: status.EDITING });
      break;
    case status.EDITING:
      this.setState({
        status: status.SAVING,
        challenge: {
          text: this.challenge.serialize(),
          points: this.points.serialize(),
        }
      });

      this.saveChallenge();
      break;
    default:
      // Do nothing
    }
  }

  saveChallenge() {
    var payload = {
      text: this.state.challenge.text,
      points: this.state.challenge.points,
      // will want a uuid
    };

    setTimeout(() => {
      this.setState({ status: status.STATIC });
    }, 400);

    // Ajax.put('/api/challenge', payload)
    //   .then((resp) => {
    //     if (resp.status == 200) {
    //       this.setState({ status: status.STATIC });
    //     }
    //   });
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
    }

    return <QuokkaMarkdown source={text} />;
  }

  getPoints() {
    var points = this.state.challenge.points || '';
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