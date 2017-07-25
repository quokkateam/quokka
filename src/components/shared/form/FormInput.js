import $ from 'jquery';
import QComponent from '../../abstract/QComponent';
import React from 'react';

class FormInput extends QComponent {

  constructor(props) {
    super(props);
    this.setInputRef = this.setInputRef.bind(this);
    this.serialize = this.serialize.bind(this);
    this.onMobile = this.onMobile.bind(this);
    this.showInvalid = this.showInvalid.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.getInputEl = this.getInputEl.bind(this);
  }

  setInputRef(ref) {
    this.input = ref;
  }

  isValid() {
    var isValid = true;

    if (this.props.required && !this.serialize()) {
      isValid = false;
      this.showInvalid();
    }

    return isValid;
  }

  serialize() {
    return $(this.input).val().trim();
  }

  onMobile() {
    return window.innerWidth < this.MOBILE_THRESH;
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

  getInputEl() {
    var name = this.props.name || '';
    var placeholder = this.props.placeholder || '';
    var defaultValue = this.props.defaultValue || '';
    var classes = this.getClassNames();

    return this.props.useTextarea ?
      <textarea className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}></textarea> :
      <input type="text" className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>;
  }

  render() {
    return this.getInputEl();
  }

}

export default FormInput;