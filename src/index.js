import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home/Home';
import registerServiceWorker from './registerServiceWorker';
import './styles/css/index.css';

ReactDOM.render(<Home />, document.getElementById('root'));

registerServiceWorker();