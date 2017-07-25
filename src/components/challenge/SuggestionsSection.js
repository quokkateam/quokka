import React from 'react';

class SuggestionsSection extends Component {
  
  constructor(props) {
    super(props);
    this.getSuggestions = this.getSuggestions.bind(this);
  }
  
  getSuggestions() {
    return this.props.suggestions.map((suggestion, i) => {
      return <li key={i}>{suggestion}</li>;
    });
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Suggestions</h2>
          <div className="challenge-section-desc featured">Need a few ideas or suggestions to help get you started?</div>
          <ul className="suggestions-list">{this.getSuggestions()}</ul>
        </div>
      </div>
    );
  }
}

export default SuggestionsSection;
