export type Comment = {
  id: number;
  post: number;
  author: number;
  author_name: string;
  date: string;
  date_gmt: string;
  content: {
    rendered: string;
  };
  status: 'approved';
  type: 'comment';
  author_avatar_urls: {
    [key: string]: string;
  };
};
