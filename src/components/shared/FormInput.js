import React, { Component } from 'react';
import $ from 'jquery';

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

  serialize() {
    var value = $(this.input).val().trim();

    if (this.props.required && !value) {
      this.showInvalid();
    }

    return value;
  }
  
  onMobile() {
    return window.innerWidth < MOBILE_THRESH;
  }

  showInvalid() {
    $(this.input).addClass(this.onMobile() ? 'invalid-mobile' : 'invalid');
  }

  onKeyUp() {
    $(this.input).removeClass('invalid invalid-mobile');

    if (this.props.onKeyUp) {
      this.props.onKeyUp($(this.input).val().trim());
    }
  }

  getClassNames() {
    var classes = this.props.classes || [];
    classes.unshift('form-input');
    return classes.join(' ');
  }
  
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