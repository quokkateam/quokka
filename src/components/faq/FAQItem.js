import React, { Component } from 'react';

class FAQItem extends Component {
  render() {
    return (
      <div className="faq-item">
        <div className="question">{this.props.question}</div>
        <div className="answer">{this.props.answer}</div>
      </div>
    );
  }
}

export default FAQItem;