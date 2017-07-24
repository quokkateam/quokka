import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('across entire suite', function () {

    it('/ renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <MemoryRouter initialEntries={[ '/' ]}>
            <App />
        </MemoryRouter>
        , div);
    });

    it('/challenge renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <MemoryRouter initialEntries={[ '/challenge' ]}>
            <App />
        </MemoryRouter>
        , div);
    });

    it('/check-in renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <MemoryRouter initialEntries={[ '/check-in' ]}>
            <App />
        </MemoryRouter>
        , div);
    });
})

