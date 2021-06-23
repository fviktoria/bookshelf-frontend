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

let styles: string[] = [ 
  "background-image: url(https://ux.christmas//static/teaser-1-95bcc16151dc1d561bd79ede903e9e7c.jpg)", 
  "background-size: cover", 
  "color: #fff", 
  "padding: 10px 20px", 
  "line-height: 35px", 
  "width : 70px", 
  "height : 70px", 
  "border : 5px solid black"]
console.log("%c Have fun!", styles.join(";") );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
