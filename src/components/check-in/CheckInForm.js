import Ajax from '../../utils/Ajax';
import Form from '../shared/form/Form';
import FormQA from '../shared/form/FormQA';
import LgSpinnerBtn from '../widgets/LgSpinnerBtn';
import React from 'react';

const SUCCESS_MESSAGE_DURATION = 3000;

class CheckInForm extends Form {

  constructor(props) {
    super(props);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.formatQAs = this.formatQAs.bind(this);
    this.submit = this.submit.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);

    this.state.checkInId = null;
    this.state.questions = this.props.questions || [];
  }

  componentDidUpdate() {
    // Set up handlers for when our component changes state
    switch (this.state.status) {
    case this.status.SERIALIZING:
      this.onSerializing();
      break;
    case this.status.COMPLETE:
      this.onComplete();
      break;
    case this.status.SENDING:
      this.submit();
      break;
    case this.status.STATIC:
      // Do nothing.
      break;
    default:
      console.warn('Unexpected status case');
      break;
    }

    return true;
  }

  onSerializing() {
    if (this.formValid()) {
      this.setState({ status: this.status.SENDING });
    }
  }

  submit() {
    var payload = {
      id: this.state.checkInId,
      questions: this.state.formComps
    };

    Ajax.put('/api/check_in', payload)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          questions: data,
          status: this.status.COMPLETE
        });
      });
  }

  onComplete() {
    setTimeout(() => {
      this.setState({ status: this.status.STATIC });
    }, SUCCESS_MESSAGE_DURATION);
  }

  formatQAs() {
    var type = 'fr-long'; // hardcoding for now until other types of answers (multi-choice, etc.) are supported

    return this.state.questions.map((data) => {
      return <FormQA key={data.question.id} type={type} question={data.question} answer={data.answer} required={true} ref={this.pushFormCompRef}/>;
    });
  }

  submitBtnClasses() {
    var classes = ['submit-form'];

    if (this.state.status === this.status.SENDING) {
      classes.push('loading');
    } else if (this.state.status === this.status.COMPLETE) {
      classes.push('complete');
    }

    return classes;
  }

  submitBtnContent() {
    return this.state.status === this.status.COMPLETE ? 'Thanks!' : 'Submit';
  }

  render() {
    return (
      <div className="check-in-form">
        <div className="check-in-form-comps">{this.formatQAs()}</div>
        <div className="check-in-form-footer">
          <LgSpinnerBtn classes={this.submitBtnClasses()} btnText={this.submitBtnContent()} onClick={this.serialize} />
        </div>
      </div>
    );
  }
}

export default CheckInForm;