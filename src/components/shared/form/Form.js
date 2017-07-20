import { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.formComps = [];
    this.pushFormCompRef = this.pushFormCompRef.bind(this);
    this.serialize = this.serialize.bind(this);
  }
  
  pushFormCompRef(ref) {
    this.formComps.push(ref);
  }
  
  serialize() {
    return this.formComps.map((ref) => {
      return ref.serialize();
    });
  }
}

export default Form;