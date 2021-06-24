import { useEffect, useState } from 'react';

export const useServiceWorkerReady = () => {
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false);

  useEffect(() => {
    navigator.serviceWorker &&
      navigator.serviceWorker.ready.then(() => {
        setServiceWorkerReady(true);
      });
  });

  return serviceWorkerReady;
};
