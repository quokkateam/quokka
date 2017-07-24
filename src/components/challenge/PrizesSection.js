import React from 'react';

const PrizesSection= () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Prizes</h2>

          <a className="challenge-prizes-link" href="/challenge" >
            <img className="challenge-prizes-image" src="https://s3-us-west-1.amazonaws.com/quokkadev/images/lululemon.png" alt="" />
            <br />
            <span className="challenge-prizes-link-title" >Reversible Yoga Mat</span>
            <br />
            <span className="challenge-prizes-link-company" >Lululemon</span>
          </a>
          <a className="challenge-prizes-link" href="/challenge" >
            <img className="challenge-prizes-image" src="https://s3-us-west-1.amazonaws.com/quokkadev/images/lululemon.png" alt="" />
            <br />
            <span className="challenge-prizes-link-title" >$20 Gift Card</span>
            <br />
            <span className="challenge-prizes-link-company" >Tender Greens</span>
          </a>
          <a className="challenge-prizes-link" href="/challenge" >
            <img className="challenge-prizes-image" src="https://s3-us-west-1.amazonaws.com/quokkadev/images/lululemon.png" alt="" />
            <br />
            <span className="challenge-prizes-link-title" >Wind Trainer</span>
            <br />
            <span className="challenge-prizes-link-company" >The North Face</span>
          </a>
        </div>
      </div>
  )
}

export default PrizesSection;
