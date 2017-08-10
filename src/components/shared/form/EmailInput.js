import $ from 'jquery';
import FormInput from './FormInput'
import React from 'react';

class EmailInput extends FormInput {
  
  constructor(props) {
    super(props);
    this.setInvalidMessageRef = this.setInvalidMessageRef.bind(this);
    this.showInvalidEmail = this.showInvalidEmail.bind(this);
    this.showEmailUnavailable = this.showEmailUnavailable.bind(this);
    this.hasEmailFormat = this.hasEmailFormat.bind(this);
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
    
    // Ensure value is in proper email format
    if (!this.hasEmailFormat(value)) {
      this.showInvalidEmail();
      return false;
    }
    
    return true;
  }
  
  showInvalidEmail() {
    $(this.invalidMessage).html('Please enter a valid email address').show();
    this.addInvalidBorder();
  }
  
  showEmailUnavailable() {
    $(this.invalidMessage).html('Email is already taken').show();
    this.addInvalidBorder();
  }
  
  hasEmailFormat(val) {
    return val.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  }
  
  onKeyUp() {
    $(this.invalidMessage).hide();
    super.onKeyUp();
  }
  
  render() {
    return (
      <div className="email-input">
        <div className="invalid-message" ref={this.setInvalidMessageRef}></div>
        <input type="text" className={this.getClassNames()} name={this.props.name || ''} placeholder={this.props.placeholder || 'Email'} defaultValue={this.props.defaultValue || ''} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>
      </div>
    );
  }
  
}

export default EmailInput;