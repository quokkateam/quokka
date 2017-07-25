import App from './App';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

const routeAppTo = (route) => (
  <MemoryRouter initialEntries={[route]}>
    <App />
  </MemoryRouter>
);

describe('<App />', () => {
  it('should redirect /garbage/sdkjfh/ to /', () => {
    const garbageDiv = document.createElement('div');
    const homeDiv = document.createElement('div');
    ReactDOM.render(routeAppTo('/garbage/sdkjfh/'), garbageDiv);
    ReactDOM.render(routeAppTo('/'), homeDiv);
    expect(garbageDiv.innerHTML).toBe(homeDiv.innerHTML);
  });

  it('should render / without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(routeAppTo('/'), div);
  });

  it('should render /challenge without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(routeAppTo('/challenge'), div);
  });

  it('should render /check-in without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(routeAppTo('/check-in'), div);
  });
});
