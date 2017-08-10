import ExtrasSection from './ExtrasSection';
import React from 'react';
import { render } from 'enzyme';

describe('<ExtraSections />', () => {
  it('should not label a link [0]', () => {
    const links = ['http://example.com'];
    const wrapper = render(<ExtrasSection links={links} />);
    expect(wrapper.find('li').text()).not.toContain('0');
  });
});