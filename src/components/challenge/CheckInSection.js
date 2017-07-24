import React from 'react';

const CheckInSection= () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Check-In</h2>
          <p className="challenge-section-desc">
            Don't forget to submit your Check-in this week by DATE!
            Check-ins help you earn Quokka points, provide us with feedback,
            and make you eligible for this week's prizes!
            <a href="/challenge"> Take me to my Week 4 Check-in</a>.
          </p>
        </div>
      </div>
  )
}

export default CheckInSection;
