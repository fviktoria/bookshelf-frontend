export type WPQueryPost<T> = {
  ID: number;
  post_title: string;
  acf: T;
  featured_image_url?: string;
};
