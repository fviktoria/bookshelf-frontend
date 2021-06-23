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
let styles: string[] = [
  'background-image: url(https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg?cs=srgb&dl=pexels-leah-kelley-373465.jpg&fm=jpg)',
  'background-size: cover',
  'color: #fff',
  'padding: 10px 20px',
  'line-height: 35px',
  'width : 70px',
  'height : 70px',
  'border : 5px solid black',
];
console.log('%c Have fun!', styles.join(';'));

// push notification
const requestNotificationPermission = () => {
  Notification.requestPermission().then((result) => {
    console.log('notifications permitted');
  });
};

requestNotificationPermission();

// show fake notification
const img =
  'https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg?cs=srgb&dl=pexels-leah-kelley-373465.jpg&fm=jpg';
const text = 'Your friend gerti345 requested to borrow a book!';
const title = 'Borrow Request';
const options = {
  body: text,
  icon: './assets/images/bookshelf-icon.png',
  vibrate: [200, 100, 200],
  tag: 'borrow-request',
  image: img,
  badge: 'https://spyna.it/icons/android-icon-192x192.png',
  actions: [{ action: 'Detail', title: 'View', icon: 'https://via.placeholder.com/128/ff0000' }],
};

navigator.serviceWorker.ready.then(function (serviceWorker) {
  setTimeout(() => {
    serviceWorker.showNotification(title, options);
  }, 5);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
