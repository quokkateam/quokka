import React, { Component } from 'react';
import $ from 'jquery';
import FormInput from '../shared/form/FormInput';
import QuokkaMarkdown from '../shared/QuokkaMarkdown';
import Session from '../../utils/Session';

const status = {
  STATIC: 0,
  EDITING: 1,
  SAVING: 2
};

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
    this.pushItemRef = this.pushItemRef.bind(this);
    this.newSuggestionBtn = this.newSuggestionBtn.bind(this);
    this.showNewSuggestion = this.showNewSuggestion.bind(this);
    this.setSuggestionListRef = this.setSuggestionListRef.bind(this);

    this.state = {
      status: status.STATIC,
      suggestions: this.props.suggestions || []
    };
  }

  setSuggestionListRef(ref) {
    this.suggestionList = ref;
  }

  pushItemRef(ref) {
    this.suggestionRefs.push(ref);
  }

  serialize() {
    var children = $(this.suggestionList).find('.form-input');
    var suggestions = [];

    for (var i = 0; i < children.length; i++) {
      suggestions.push($(children[i]).val().trim());
    }

    return suggestions;
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

    if (editable && this.state.suggestions.length == 0) {
      return [<li key={0}><FormInput placholder="Suggestion"/></li>];
    }

    return this.state.suggestions.map((s, i) => {
      var liChild;

      if (editable) {
        liChild = <FormInput disabled={isSaving} placholder="Suggestion" defaultValue={s}/>;
      } else {
        liChild = <QuokkaMarkdown source={s}/>;
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
      break;
    default:
      // Do nothing
    }
  }

  componentDidUpdate() {
    if (this.state.status === status.SAVING) {
      this.saveSuggestions();
    }

    return true;
  }

  saveSuggestions() {
    var suggestions = [];
    var data = this.state.suggestions;

    for (var i = 0; i < data.length; i++) {
      if (data[i]) {
        suggestions.push(data[i]);
      }
    }

    // var payload = {
    //   suggestions: suggestions
    //   // need some sort of challenge id
    // };

    setTimeout(() => {
      this.setState({
        status: status.STATIC,
        suggestions: suggestions
      });
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

  newSuggestionBtn() {
    var editable = this.isEditing() || this.isSaving();

    if (!editable) {
      return;
    }

    return <button className="new-suggestion-btn" onClick={this.showNewSuggestion}>New Suggestion</button>;
  }

  showNewSuggestion() {
    var suggestions = this.serialize();
    suggestions.push('');
    this.setState({ suggestions: suggestions });
  }

  render() {
    this.suggestionRefs = [];
    return (
      <div className="container-fluid suggestions-section">
        {this.getModBtn()}
        <div className="row">
          <div className="challenge-section-title">Need help getting started?</div>
          <ul className={this.suggestionsListClasses()} ref={this.setSuggestionListRef}>{this.getSuggestions()}</ul>
          {this.newSuggestionBtn()}
        </div>
      </div>
    );
  }
}

export default GettingStartedSection;
