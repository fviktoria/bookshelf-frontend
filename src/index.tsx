import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// fancy console log
console.warn('Beware of fancy console log incoming!');
let styles: string[] = [
  'background-image: url(https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg?cs=srgb&dl=pexels-leah-kelley-373465.jpg&fm=jpg)',
  'background-size: cover',
  'color: #000',
  'padding: 10px 20px',
  'line-height: 35px',
  'width : 70px',
  'height : 70px',
  'border : 5px solid black',
];
console.log('%c Have fun!', styles.join(';'));
console.warn('The message above might not be working in Firefox.');
console.log('Beware of unicorns 🦄');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
