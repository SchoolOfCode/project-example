import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const Wrapper = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
