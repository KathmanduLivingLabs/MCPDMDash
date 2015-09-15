import React from 'react';
var App = require('./components/App');

require('./index.html');

React.initializeTouchEvents(true);

React.render(<App />, document.body);


window.React = React;
