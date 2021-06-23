import { FC, useEffect } from 'react';
import { BookList } from '../components/book-list/book-list';
import { useServiceWorkerReady } from '../hooks/use-service-worker-ready';
import { showDummyNotification } from '../util/dummy-notification';

export const Bookshelf: FC = () => {
  const serviceWorkerReady = useServiceWorkerReady();

  useEffect(() => {
    if (serviceWorkerReady) {
      const timeout = setTimeout(() => {
        showDummyNotification();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [serviceWorkerReady]);

  return <BookList />;
};
