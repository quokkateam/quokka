import React, { Component } from 'react';

import FormInput from '../shared/form/FormInput';
import QuokkaMarkdown from '../shared/QuokkaMarkdown';
import Session from '../../utils/Session';

const status = {
  STATIC: 0,
  EDITING: 1,
  SAVING: 2
};

const SUCCESS_MESSAGE_DURATION = 2000;

class GettingStartedSection extends Component {

  constructor(props){
    super(props);

    this.getModBtn = this.getModBtn.bind(this);
    this.onModBtnClick = this.onModBtnClick.bind(this);
    this.saveSuggestions = this.saveSuggestions.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.isEditing = this.isEditing.bind(this);
    this.isSaving = this.isSaving.bind(this);
    this.suggestionsListClasses = this.suggestionsListClasses.bind(this);

    this.state = {
      status: status.STATIC,
      suggestions: this.props.suggestions || []
    };
  }

  isEditing() {
    return Session.isAdmin() && this.state.status === status.EDITING;
  }

  isSaving() {
    return Session.isAdmin() && this.state.status === status.SAVING;
  }

  getSuggestions() {
    var isSaving = this.isSaving();
    var editable = isSaving || this.isEditing();

    return this.state.suggestions.map((s, i) => {
      if (editable) {
        var liChild = <FormInput disabled={isSaving} placholder="Suggestion" defaultValue={s}/>;
      } else {
        var liChild = <QuokkaMarkdown source={s}/>;
      }

      return <li key={i}>{liChild}</li>;
    });
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
      this.setState({
        status: status.SAVING,
        suggestions: this.serialize()
      });

      this.saveSuggestions();
      break;
    default:
      // Do nothing
    }
  }

  saveSuggestions() {
    var payload = {
      suggestions: this.state.suggestions
      // need some sort of challenge id
    };

    setTimeout(() => {
      this.setState({ status: status.STATIC });
    }, 400);

    // Ajax.put('/api/suggestions', payload)
    //   .then((resp) => {
    //     if (resp.status == 200) {
    //       this.setState({ status: status.STATIC });
    //     }
    //   });
  }

  suggestionsListClasses() {
    var classes = ['suggestions-list'];

    if (this.isEditing() || this.isSaving()) {
      classes.push('editable');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <div className="container-fluid suggestions-section">
        {this.getModBtn()}
        <div className="row">
          <div className="challenge-section-title">Need help getting started?</div>
          <ul className={this.suggestionsListClasses()}>{this.getSuggestions()}</ul>
        </div>
      </div>
    );
  }
}

export default GettingStartedSection;
