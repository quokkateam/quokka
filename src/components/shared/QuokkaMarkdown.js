import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';


/**
 * Use to render markdown. Example usage: `<QuokkaMarkdown source={markdown_source_string}/>`
 * 
 * Wraps `ReactMarkdown` and set skipHtml to true.
 * 
 * @class QuokkaMarkdown
 * @extends {Component}
 */
class QuokkaMarkdown extends Component {
  render() {
    return (
      <ReactMarkdown skipHtml={true} {...this.props} />
    );
  }
}

export default QuokkaMarkdown;