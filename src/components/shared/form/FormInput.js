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
    this.addInvalidBorder = this.addInvalidBorder.bind(this);
    this.addInvalidShadow = this.addInvalidShadow.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.clear = this.clear.bind(this);
    this.getTextarea = this.getTextarea.bind(this);
    this.getInput = this.getInput.bind(this);
    this.getEl = this.getEl.bind(this);
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

  // display the input as invalid
  showInvalid() {
    this.onMobile() && !this.props.useTextarea ? this.addInvalidBorder() : this.addInvalidShadow();
  }
  
  addInvalidBorder() {
    $(this.input).addClass('invalid-border');
  }
  
  addInvalidShadow() {
    $(this.input).addClass('invalid-shadow');
  }

  // remove any invalid display of the input field when user begins typing again
  onKeyUp() {
    $(this.input).removeClass('invalid-border invalid-shadow');

    // bubble this up if necessary
    if (this.props.onKeyUp) {
      this.props.onKeyUp(this.serialize());
    }
  }

  // accounting for any desired class names that were passed down
  getClassNames() {
    var classes = this.props.classes || [];
    classes.unshift('form-input');  // we want form-input to be 1st
    return classes.join(' ');
  }

  // empty the input
  clear() {
    $(this.input).val('');
  }

  getTextarea(name, placeholder, defaultValue, classes, disabled) {
    if (disabled) {
      return <textarea disabled className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}></textarea>;
    }

    return <textarea className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}></textarea>;
  }

  getInput(name, placeholder, defaultValue, classes, disabled) {
    if (disabled) {
      return <input type="text" disabled className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>;
    }

    return <input type="text" className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} onKeyUp={this.onKeyUp} ref={this.setInputRef}/>;
  }

  getEl() {
    var name = this.props.name || '';
    var placeholder = this.props.placeholder || '';
    var defaultValue = this.props.defaultValue || '';
    var disabled = !!this.props.disabled;
    var classes = this.getClassNames();

    if (this.props.useTextarea) {
      return this.getTextarea(name, placeholder, defaultValue, classes, disabled);
    }

    return this.getInput(name, placeholder, defaultValue, classes, disabled);
  }

  render() {
    return this.getEl();
  }

}

export default FormInput;