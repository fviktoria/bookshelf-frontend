import useSWR from 'swr';
import { API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';
import { Media } from '../../util/types/media';

export const fetchImage = (id: number): Promise<any> => {
  return fetcher('GET', API_WP + '/media/' + id);
};

export const useImageQuery = (id: number): ImageQueryRes => {
  const { data, error } = useSWR('/media/' + id, () => fetchImage(id));
  return {
    image: data && data.data,
    error,
    isLoading: !data && !error,
  };
};

type ImageQueryRes = {
  image: Media;
  error: boolean;
  isLoading: boolean;
};
