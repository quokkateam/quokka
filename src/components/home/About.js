import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <section id="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12 about-category">
              <img className="icon" src="https://s3-us-west-1.amazonaws.com/quokkadev/marketing/images/evidence.png" alt=""/>
              <h2 className="about-category-title">Learn the Basics</h2>
              <p className="about-category-desc">We’ve done our homework to make sure that our 8 challenges are built on sound science. We’ll share that info with you and get you acquainted with related resources on campus.</p>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 about-category">
              <img className="icon" src="https://s3-us-west-1.amazonaws.com/quokkadev/marketing/images/community.png" alt=""/>
              <h2 className="about-category-title">Challenge Yourself</h2>
              <p className="about-category-desc">Receive a curated challenge in your inbox each week. We’ll give you the instructions, and you’ll attempt to stick to the challenge along with thousands of other participating students. Let’s do this together!</p>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 about-category">
              <img className="icon" src="https://s3-us-west-1.amazonaws.com/quokkadev/marketing/images/gift.png" alt=""/>
              <h2 className="about-category-title">Reap the Rewards</h2>
              <p className="about-category-desc">Check in every week for chances to win prizes from local businesses<span className="mdash">&mdash;</span>rewards like restaurant gift cards, free massages, or special access to challenge-related events!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
