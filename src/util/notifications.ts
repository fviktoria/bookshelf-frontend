export const askNotificationPermission = async () => {
  Notification.requestPermission().then((result) => {
    return true;
  });
  return false;
};

export const isPermissionGranted = () => {
  if (Notification.permission === 'granted') {
    return true;
  }
  return false;
};
