export type Comment = {
  comment_ID: number;
  comment_post_ID: number;
  comment_author: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_author_IP: string;
  comment_date: string;
  comment_date_gmt: string;
  comment_content: string;
  comment_karma: number;
  comment_approved: boolean;
  comment_agent: string;
  comment_type: string;
  comment_parent: number;
  user_id: number;
};
