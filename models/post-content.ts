export interface Post {
  title: string;
  slug: string;
  firebaseCoverImageUrl: string;
  published: boolean;
  date: Date;
  coverImage: string;
  resume: string;
  url: string;
  id: string;
  slugId: string;
  tags: string[];
  blurDataURL: string;
  formattedDate: string;
}

export interface PostContent extends Post {
  content: string;
}

export interface PostsResult {
  next_cursor: string;
  has_more: boolean;
  posts: Post[];
}
