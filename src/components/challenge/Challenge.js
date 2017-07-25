import React, { Component } from 'react';
import BannerSection from './BannerSection';
import CheckInSection from './CheckInSection';
import SuggestionsSection  from './SuggestionsSection';
import PrizesSection from './PrizesSection';
import ChallengeSection  from './ChallengeSection';
import OverviewSection from './OverviewSection';
import InviteFriendsSection from './InviteFriendsSection';

class Challenge extends Component {
  
  constructor(props) {
    super(props);
    
    // Simulating server-responded payload
    this.data = {
      habit: 'Exercise',
      habitIcon: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/running-green.png',
      weekNum: 4,
      dates: {
        start: 'Sept 17', // TODO: use MM/DD/YYYY and add moment() date formatter library
        end: 'Sept 24'
      },
      overview: 'Over the past few weeks, you’ve been learning a lot about what you can do to improve ' +
        'your well-being. This week is an opportunity for you to to do some research on your own! The focus ' +
        'of this week is on how foods can affect how we feel, both physically and emotionally. Besides helping ' +
        'you stay in shape, healthy foods can help you increase your energy, boost your immune system, minimize ' +
        'inflammation, promote muscle building, and more. Learn more about the science behind healthy eating.',
      challenge: {
        text: 'Take the first day of this week to check out the Harvard School of Public Health’s Healthy Eating ' +
          'Plate Guide on how to make better food decisions. Pick what will be an improvement for your health and ' +
          'then stick to it for every day this week.',
        points: 60
      },
      prizes: [
        {
          sponsor: {
            id: 1,
            name: 'The North Face / KEEN',
            logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/thenorthface.png',
            url: 'https://thenorthface.com'
          },
          prize: 'Free pair of shoes'
        },
        {
          sponsor: {
            id: 2,
            name: 'Lululemon',
            logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/lululemon.png',
            url: 'https://lululemon.com'
          },
          prize: 'Yoga mat giveaway'
        },
        {
          sponsor: {
            id: 3,
            name: 'Stanford Rec',
            logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/stanford-rec.png',
            url: 'http://recreation.stanford.edu/'
          },
          prize: 'Free personal training session'
        }
      ],
      suggestions: [
        'Try 3 different types of exercise this week.',
        'Walk or bike instead of driving.',
        'Take stairs over elevators.',
        'Sit less. Move more.'
      ],
      adjHabits: {
        prev: {
          weekNum: 3,
          habit: 'Sleep'
        },
        next: {
          weekNum: 5,
          habit: 'Journaling'
        }
      }
    };
  }
  
  render() {
    return (
      <div>
        <div id="challenge">
          <BannerSection habit={this.data.habit} habitIcon={this.data.habitIcon} weekNum={this.data.weekNum} dates={this.data.dates} adjHabits={this.data.adjHabits} />
          <OverviewSection overview={this.data.overview} />
          <ChallengeSection challenge={this.data.challenge} />
          <PrizesSection prizes={this.data.prizes} />
          <SuggestionsSection suggestions={this.data.suggestions} />
          <CheckInSection weekNum={this.data.weekNum} endDate={this.data.dates.end} />
        </div>
        <InviteFriendsSection />
      </div>
    );
  }
}

export default Challenge;
