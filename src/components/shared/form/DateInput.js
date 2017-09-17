import $ from 'jquery';
import FormInput from './FormInput';
import moment from 'moment';
import React from 'react';

class DateInput extends FormInput {

  constructor(props) {
    super(props);
    this.setInvalidMessageRef = this.setInvalidMessageRef.bind(this);
    this.showInvalidDate = this.showInvalidDate.bind(this);
    this.showInvalidWithMessage = this.showInvalidWithMessage.bind(this);
  }

  setInvalidMessageRef(ref) {
    this.invalidMessage = ref;
  }

  isValid() {
    // if not required, it's always valid
    if (!this.props.required) {
      return true;
    }

    var value = this.serialize();

    // Ensure value is not empty
    if (!value) {
      this.showInvalid();
      return false;
    }

    // Ensure value is in proper format
    if (!moment(value, 'MM/DD/YY').isValid()) {
      this.showInvalidDate();
      return false;
    }

    return true;
  }

  showInvalidDate() {
    this.showInvalidWithMessage('Please enter a valid date with format: ' + this.props.format);
  }

  showInvalidWithMessage(msg) {
    $(this.invalidMessage).html(msg).show();
    this.addInvalidBorder();
  }

  onKeyUp() {
    $(this.invalidMessage).hide();
    super.onKeyUp();
  }

  render() {
    return (
      <div className="date-input">
        <div className="invalid-message" ref={this.setInvalidMessageRef}></div>
        <input type="text" className={this.getClassNames()} name={this.props.name || ''} placeholder={this.props.placeholder || this.props.format} defaultValue={this.props.defaultValue || ''} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>
      </div>
    );
  }

}

export default DateInput;