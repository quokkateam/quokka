import React, { Component } from 'react';
import FAQItem from './FAQItem';

class FAQ extends Component {
  
  constructor(props) {
    super(props);
    
    this.data = {
      faqs: [
        {
          question: 'What is a Quokka?',
          answer: 'Lorem ipsum dolor sit amet, odio consequat non orci tempor, elementum et sollicitudin ut, in aliquet est, sagittis in pulvinar dignissimos, tristique feugiat. Malesuada et ac orci ultricies, neque nec bibendum natoque habitasse pellentesque, eget nisl sit dolorem libero tincidunt, purus voluptates at ac diam.'
        },
        {
          question: 'What is the Quokka Challenge?',
          answer: 'Lorem ipsum dolor sit amet, odio consequat non orci tempor, elementum et sollicitudin ut, in aliquet est, sagittis in pulvinar dignissimos, tristique feugiat. Malesuada et ac orci ultricies, neque nec bibendum natoque habitasse pellentesque, eget nisl sit dolorem libero tincidunt, purus voluptates at ac diam.'
        },
        {
          question: 'Which schools have participated?',
          answer: 'Lorem ipsum dolor sit amet, odio consequat non orci tempor, elementum et sollicitudin ut, in aliquet est, sagittis in pulvinar dignissimos, tristique feugiat. Malesuada et ac orci ultricies, neque nec bibendum natoque habitasse pellentesque, eget nisl sit dolorem libero tincidunt, purus voluptates at ac diam.'
        },
        {
          question: 'Where happens with data?',
          answer: 'Lorem ipsum dolor sit amet, odio consequat non orci tempor, elementum et sollicitudin ut, in aliquet est, sagittis in pulvinar dignissimos, tristique feugiat. Malesuada et ac orci ultricies, neque nec bibendum natoque habitasse pellentesque, eget nisl sit dolorem libero tincidunt, purus voluptates at ac diam.'
        },
        {
          question: 'Who can I contact for more info?',
          answer: 'Lorem ipsum dolor sit amet, odio consequat non orci tempor, elementum et sollicitudin ut, in aliquet est, sagittis in pulvinar dignissimos, tristique feugiat. Malesuada et ac orci ultricies, neque nec bibendum natoque habitasse pellentesque, eget nisl sit dolorem libero tincidunt, purus voluptates at ac diam.'
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
      </div>
    );
  }
}

export default FAQ;