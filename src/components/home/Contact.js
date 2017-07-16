import React, { Component } from 'react';
import HorizSpinner from '../widgets/spinners/horiz-spinner'
import $ from 'jquery'

class Contact extends Component {
	
  constructor(props) {
    super(props);
    this.setSectionRef = this.setSectionRef.bind(this);
    this.getTopPosition = this.getTopPosition.bind(this);
  }

  setSectionRef(ref) {
    this.section = ref;
  }
  
	getTopPosition() {
    return $(this.section)[0].offsetTop;
	}
	
	render() {
		return (
		  <section id="contact" ref={this.setSectionRef}>
				<div className="container-fluid">
					<div className="leading-contact-text">Want Quokka on your campus? Let us know!</div>
					<div className="row">
						<div className="col-md-6 col-sm-12 col-xs-12 contact-field-container" role="school">
							<input type="text" className="contact-field" placeholder="School" name="school" />
						</div>
						<div className="col-md-6 col-sm-12 col-xs-12 contact-field-container" role="email">
							<input type="text" className="contact-field" placeholder="Email" name="email" />
							<button className="submit-desktop" data-action="submit-contact"></button>
						</div>
					</div>
					<div className="submit-mobile-container">
						<button className="submit-mobile" data-action="submit-contact">Submit</button>
						<HorizSpinner />
					</div>
				</div>
      </section>
		);
	}
}

export default Contact;