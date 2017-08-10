import Challenge from './Challenge';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Challenge />', () => {
  it('renders correctly', () => {
    const challenge = renderer.create(
      <MemoryRouter>
        <Challenge />
      </MemoryRouter>
    ).toJSON();
    expect(challenge).toMatchSnapshot();
  });
});