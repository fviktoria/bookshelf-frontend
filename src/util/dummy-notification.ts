export const showDummyNotification = () => {
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

  return new Notification(title, options);
};
