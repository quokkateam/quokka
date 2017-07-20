import React from 'react';
import Form from '../shared/form/Form'
import FormQA from '../shared/form/FormQA'

class CheckInForm extends Form {
  
  constructor(props) {
    super(props);
    this.formatQAs = this.formatQAs.bind(this);
  }
  
  formatQAs() {
    return this.props.formData.map((data) => {
      return <FormQA key={data.id} type={data.type} question={data.question} defaultValue={data.answer}/>;
    });
  }
  
	render() {
		return (
		  <div className="check-in-form">{this.formatQAs()}</div>
    );
	}
}

export default CheckInForm;