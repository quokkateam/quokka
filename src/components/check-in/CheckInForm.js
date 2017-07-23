import React from 'react';
import Form from '../shared/form/Form'
import FormQA from '../shared/form/FormQA'
import LgSpinnerBtn from '../widgets/LgSpinnerBtn'

const SUCCESS_MESSAGE_DURATION = 3000;

class CheckInForm extends Form {

  constructor(props) {
    super(props);
    this.onSerializing = this.onSerializing.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.formatQAs = this.formatQAs.bind(this);
    this.submit = this.submit.bind(this);
    this.submitBtnClasses = this.submitBtnClasses.bind(this);
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
        // Do nothing.
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
      this.submit();
    }
  }

  submit() {
    this.setState({ status: this.status.SENDING });

    // using setTimeout to simulate network request duration
    setTimeout(() => {
      this.setState({ status: this.status.COMPLETE });
    }, 300);

    // TODO uncomment this code when we're actually talking to an API.
    // POST or PUT depending on check-in status
    // axios.post('/check-in', this.state.formComps).then(() => {
    //  this.setState({ status: status.COMPLETE });
    // });
  }

  onComplete() {
    setTimeout(() => {
      this.setState({ status: this.status.STATIC });
    }, SUCCESS_MESSAGE_DURATION);
  }

  formatQAs() {
    return this.props.formData.map((data) => {
      return <FormQA key={data.id} type={data.type} question={data.question} answer={data.answer} required={true} ref={this.pushFormCompRef}/>;
    });
  }

  submitBtnClasses() {
    var classes = ['submit-form'];

    if (this.state.status === this.status.SENDING) {
      classes.push('loading');
    } else if (this.state.status == this.status.COMPLETE) {
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