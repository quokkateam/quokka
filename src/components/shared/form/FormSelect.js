import $ from 'jquery';
import QComponent from '../../abstract/QComponent';
import React from 'react';

class FormSelect extends QComponent {

  constructor(props) {
    super(props);
    this.setSelectRef = this.setSelectRef.bind(this);
    this.serialize = this.serialize.bind(this);
    this.onMobile = this.onMobile.bind(this);
    this.showInvalid = this.showInvalid.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.clear = this.clear.bind(this);
    this.selectOptWithVal = this.selectOptWithVal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getPlaceholder = this.getPlaceholder.bind(this);

    this.state = { options: this.props.options || [] };
  }

  setSelectRef(ref) {
    this.select = ref;
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
    return $(this.select).find(':selected').val();
  }

  onMobile() {
    return window.innerWidth < this.MOBILE_THRESH;
  }

  // display the input as invalid, usually with a red-border around it.
  showInvalid() {
    $(this.select).addClass(this.onMobile() ? 'invalid-border' : 'invalid-shadow');
  }

  // accounting for any desired class names that were passed down
  getClassNames() {
    var classes = this.props.classes || [];
    classes.unshift('form-select');  // we want form-select to be 1st
    return classes.join(' ');
  }

  clear() {
    $(this.select).val('');
  }
  
  selectOptWithVal(val) {
    $(this.select).val(val);
  }
  
  formatOptions() {
    return this.state.options.map((option, i) => {
      return <option key={i} value={option.value}>{option.title}</option>;
    });
  }
  
  onChange() {
    $(this.select).removeClass('invalid-border invalid-shadow');

    // bubble this up if necessary
    if (this.props.onChange) {
      this.props.onChange(this.serialize());
    }
  }

  getPlaceholder() {
    const ph = this.props.placeholder;

    if (!ph) {
      return;
    }

    return <option value='' disabled>{ph}</option>;
  }

  render() {
    return (
      <div className="form-select-container">
        <select className={this.getClassNames()} defaultValue={this.props.defaultValue || this.state.defaultValue || ''} name={this.props.name || ''} onChange={this.onChange} ref={this.setSelectRef}>
          {this.getPlaceholder()}
          {this.formatOptions()}
        </select>
        <i className="fa fa-caret-down arrow"></i>
      </div>
    );
  }

}

export default FormSelect;