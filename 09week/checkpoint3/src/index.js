import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const authenticationSuccess = ()=> {
  console.log('Successful authentication');
};

const authenticationFailure = ()=> {
  console.log('Failed authentication');
};

window.Trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
      read: 'true',
      write: 'true' },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
  });

ReactDOM.render(<App />, document.getElementById('root'));
