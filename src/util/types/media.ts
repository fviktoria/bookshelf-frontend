import { Post } from './post';

export type Media = Post<any> & {
  alt_text: string;
  caption: {
    rendered: string;
  };
  comment_status: 'open';
  description: {
    rendered: string;
  };
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: any;
    image_meta: any;
  };
  media_type: 'image';
  meta: any;
  ping_status: 'closed';
  post: number;
  source_url: string;
};
