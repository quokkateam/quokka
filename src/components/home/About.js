import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <section id="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12 about-category" id="challenges">
              <img className="icon" src="https://s3-us-west-1.amazonaws.com/quokkadev/marketing/images/evidence.png" alt=""/>
              <h2 className="about-category-title">Evidence-Based Challenges</h2>
              <p className="about-category-desc">When students sign up for the program, they’re given weekly challenges—each based around one healthy habit—that are backed with scientific research and provide information about campus resources.</p>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 about-category" id="prizes">
              <img className="icon" src="https://s3-us-west-1.amazonaws.com/quokkadev/marketing/images/gift.png" alt=""/>
              <h2 className="about-category-title">Events & Prizes</h2>
              <p className="about-category-desc">Students will be notified about challenge-related events hosted that week by wellness offices or student clubs and can win prizes from the community in return for their participation.</p>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 about-category" id="community">
              <img className="icon" src="https://s3-us-west-1.amazonaws.com/quokkadev/marketing/images/community.png" alt=""/>
              <h2 className="about-category-title">Community</h2>
              <p className="about-category-desc">With our web-based platform, we take advantage of the way students regularly communicate to encourage them to improve their own well-being throughout the year. When students practice these habits with their peers, they hold each other accountable and have more fun in the process!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
