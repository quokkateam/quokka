import React, { Component } from 'react';

import Contact from '../home/Contact';
import FAQItem from './FAQItem';
import QuokkaMarkdown from '../shared/QuokkaMarkdown';

class FAQ extends Component {
  
  constructor(props) {
    super(props);
    
    this.data = {
      faqs: [
        {
          question: 'What\'s a Quokka?',
          answer: 'Quokkas (pronunciation: kwok-uh) are small marsupials found in southwestern Australia that are often described as the "world\'s happiest animal." About the size of a teddy bear or house cat, quokkas are known for their friendliness and happy demeanor. We hope to inspire college students to start their Quokka journey and get happy with the Quokka Challenge!'
        },
        {
          question: 'What\'s the Quokka Challenge?',
          answer: 'The Quokka Challenge promotes healthy behaviors that have been empirically shown to improve well-being (e.g., exercise, sleep, healthy eating, mindfulness). The 8-week program is coordinated across multiple universities each year, and students can sign up if their school is part of the current cohort.'
        },
        {
          question: 'What are the weekly challenges like?',
          answer: 'When you sign up for the program, you’re given weekly challenges, each based around one healthy habit. These challenges are backed with research, provide information about campus resources, and connect you to other challengers through local events. When you submit your check-in at the end of the week, you can even win prizes for trying these habits out!'
        },
        {
          question: 'What if there are multiple challenge options in a week?',
          answer: 'See what works best for you! Choose one option to focus on, or if you\'re looking for a bigger challenge, try more! Just tell us at the end of the week what you decided to go for.'
        },
        {
          question: 'What kinds of prizes can we win?',
          answer: 'Depending on your campus, prizes can range from school-sponsored gear and gift cards to massages and private fitness classes. You’ll get more information about all the prizes in each week’s email. If you submit a check-in for all 8 weeks, you might receive a bonus Challenge Champion prize.'
        },
        {
          question: 'Which schools are participating this fall?',
          answer: 'Check out our home page to sign up and see which other schools are hosting the Quokka Challenge.'
        },
        {
          question: 'I want my school to join the Quokka Challenge. Who can I contact for more information?',
          answer: <QuokkaMarkdown source='Contact us at [team@quokkachallenge.com](mailto:team@quokkachallenge.com), or enter your info below.'/>
        }
      ]
    };
    
    this.getFAQs = this.getFAQs.bind(this);
  }
  
  getFAQs() {
    return this.data.faqs.map((info, i) => {
      return <FAQItem key={i} question={info.question} answer={info.answer} />;
    });
  }
  
  render() {
    return (
      <div id="faq">
        <div className="faq-header">
          <div className="faq-leading-text">Frequently Asked Questions</div>
        </div>
        <div className="faq-items">{this.getFAQs()}</div>
        <Contact />
      </div>
    );
  }
}

export default FAQ;
