import React, { Component } from 'react';
import HorizSpinner from '../widgets/spinners/horiz-spinner'

class Contact extends Component {
	render() {
		return (
		  <section id="contact">
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