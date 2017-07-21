import React from 'react';

const SuggestionsSection = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <h2 className="challenge-section-title">Suggestions</h2>
        <p className="challenge-section-desc">
          <b>Need a few ideas or suggestions to help get you started?</b>
          <ul>
            <li>
              Consider eating bigger breakfasts, more protein, greater
                amounts of fiber, or meals with all food groups.
              </li>
            <li>
              Try drinking the full recommended amount of water per day.
              </li>
            <li>
              Look ahead to the <a href="/challenge">online menu</a> to
                pick what you'll eat before you hit the dining hall - you'll
                be more likely to stick to your decision if you know what
                you're eating beforehand.
              </li>
            <li>
              Learn more about the <a href="/challenge">portion sizes </a>
              of Stanford's dishware to become more aware of how much
                you're eating.
              </li>
          </ul>
        </p>
      </div>
    </div>
  )
}

export default SuggestionsSection;
