import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';


window.xmlrpc = require('xmlrpc');

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
