import React, { Component } from 'react';
import $ from 'jquery';

// We should define this somewhere globally, maybe as a property of
// our own QuokkaComponent Class
const MOBILE_THRESH = 991;

class FormInput extends Component {
  
  constructor(props) {
    super(props);
    this.setInputRef = this.setInputRef.bind(this);
    this.serialize = this.serialize.bind(this);
    this.onMobile = this.onMobile.bind(this);
    this.showInvalid = this.showInvalid.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  setInputRef(ref) {
    this.input = ref;
  }

  // return the input field's value
  serialize() {
    var value = $(this.input).val().trim();

    // If this input field is "required" and the value is empty,
    // display the input as invalid to the user.
    if (this.props.required && !value) {
      this.showInvalid();
    }

    return value;
  }
  
  onMobile() {
    return window.innerWidth < MOBILE_THRESH;
  }

  // display the input as invalid, usually with a red-border around it.
  showInvalid() {
    $(this.input).addClass(this.onMobile() ? 'invalid-mobile' : 'invalid');
  }

  // remove any invalid display of the input field when user begins typing again
  onKeyUp() {
    $(this.input).removeClass('invalid invalid-mobile');

    // bubble this up if necessary
    if (this.props.onKeyUp) {
      this.props.onKeyUp($(this.input).val().trim());
    }
  }
  
  // accounting for any desired class names that were passed down
  getClassNames() {
    var classes = this.props.classes || [];
    classes.unshift('form-input');  // we want form-input to be 1st
    return classes.join(' ');
  }
  
  // empty the input
  clearInput() {
    $(this.input).val('');
  }
  
  render() {
    return (
      <input type="text" className={this.getClassNames()} name={this.props.name || ''} placeholder={this.props.placeholder || ''} defaultValue={this.props.defaultValue || ''} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>
    );
  }
  
}

export default FormInput;