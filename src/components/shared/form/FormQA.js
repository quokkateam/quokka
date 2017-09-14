import React, { Component } from 'react';
import FormInput from './FormInput';

class FormQA extends Component {

  constructor(props) {
    super(props);
    this.setAnswerRef = this.setAnswerRef.bind(this);
    this.getFormAnswerComp = this.getFormAnswerComp.bind(this);
    this.formQuestionClasses = this.formQuestionClasses.bind(this);
    this.serialize = this.serialize.bind(this);
  }

  setAnswerRef(ref) {
    this.answer = ref;
  }

  getFormAnswerComp() {
    var freeRespLong = <FormInput required={true} useTextarea={true} classes={this.props.answerClasses} placeholder={this.props.placeholder} defaultValue={(this.props.answer || {}).text} name={this.props.name} ref={this.setAnswerRef}/>;

    switch (this.props.type) {
    case 'fr-long':
      return freeRespLong;
    case 'fr-short':
      return <FormInput required={true} classes={this.props.answerClasses} placeholder={this.props.placeholder} defaultValue={(this.props.answer || {}).text} name={this.props.name} ref={this.setAnswerRef}/>;
    case 'multi-choice':
      // TODO: add multiple choice answer component
      break;
    default:
      return freeRespLong;
    }
  }

  formQuestionClasses() {
    var classes = this.props.questionClasses || [];
    classes.unshift('form-question');
    return classes.join(' ');
  }

  isValid() {
    return this.answer.isValid();
  }

  serialize() {
    return {
      question: this.props.question,
      answer: {
        id: (this.props.answer || {}).id,
        text: this.answer.serialize()
      }
    };
  }

  render() {
    return (
      <div className="form-qa">
        <div className={this.formQuestionClasses()}>{this.props.question.text}</div>
        <div className="form-answer">{this.getFormAnswerComp()}</div>
      </div>
    );
  }
}

export default FormQA;