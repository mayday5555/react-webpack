import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Header from './components/Nav';


// Render the main component into the dom
  ReactDOM.render(<Header><span>1</span></Header>, document.getElementById('header'));
ReactDOM.render(<App />, document.getElementById('app'));
