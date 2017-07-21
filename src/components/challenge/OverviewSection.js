import React from 'react';

const OverviewSection= () => {
  return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="challenge-section-title">Habit Overview</h2>
          <p className="challenge-section-desc">
            Over the past few weeks, you've been learning a lot about what
            you can do to improve your well-being. This week is an opportunity
            for you to do some research on your own! The focus of this week
            is on how foods can affect how we feel, both physically and
            emotionally. Besides helping you stay in shape, healthy foods can
            help you increase your energy, boost your immune system,
            minimize inflammation, promote muscle building, and more.
            <a href="/challenge"> Learn more about the science behind healthy eating</a>.
          </p>
        </div>
      </div>
  )
}

export default OverviewSection;
