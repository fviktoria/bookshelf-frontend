export type Post<T> = {
  acf: T;
  date: string;
  date_gmt: string;
  featured_media: number;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft';
  template: string;
  title: {
    rendered: string;
  };
  type: string;
};
