import React from 'react';
import { Link } from 'react-router-dom';

const CheckInSection= () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Check-In</h2>
          <p className="challenge-section-desc">
            Don't forget to submit your Check-in this week by DATE!
            Check-ins help you earn Quokka points, provide us with feedback,
            and make you eligible for this week's prizes!
            <Link to="/challenge"> Take me to my Week 4 Check-in</Link>.
          </p>
        </div>
      </div>
  )
}

export default CheckInSection;
