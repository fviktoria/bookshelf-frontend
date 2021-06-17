import { Comment } from './comment';

export type WPQueryPost<T> = {
  ID: number;
  post_title: string;
  acf: T;
  featured_image_url?: string;
  comment_status: 'open' | 'closed';
  comments?: Comment[];
};
