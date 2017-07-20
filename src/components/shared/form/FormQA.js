import React, { Component } from 'react';
import FormInput from './FormInput'

class FormQA extends Component {
  
  constructor(props) {
    super(props);
    this.getFormAnswerComp = this.getFormAnswerComp.bind(this);
    this.formQuestionClasses = this.formQuestionClasses.bind(this);
  }
  
  getFormAnswerComp() {
    var freeRespLong = <FormInput useTextarea={true} classes={this.props.answerClasses} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} name={this.props.name}/>;
    
    switch (this.props.type) {
      case 'fr-long':
        return freeRespLong;
      case 'fr-short':
        return <FormInput classes={this.props.answerClasses} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} name={this.props.name}/>;
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
  
	render() {
		return (
			<div className="form-qa">
        <div className={this.formQuestionClasses()}>{this.props.question}</div>
        <div className="form-answer">{this.getFormAnswerComp()}</div>
      </div>
		);
	}
}

export default FormQA;