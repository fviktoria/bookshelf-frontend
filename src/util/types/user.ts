import { Book } from './book';

export type User = {
  acf: {
    books: string[];
    friends: false;
  };
  avatar_urls: any;
  description: string;
  id: number;
  link: string;
  meta: any;
  name: string;
  slug: string;
  url: string;
};
