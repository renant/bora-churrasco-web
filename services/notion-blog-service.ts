import { PostsNotionDatabaseResult } from "@/models/notion-models/database-notion";

export interface Post {
  title:      string;
  slug:       string;
  published:  boolean;
  date:       Date;
  coverImage: string;
  resume:     string;
  url:        string;
  id:         string;
}


const getPosts = async (): Promise<Post[]> =>  {
  var headers = new Headers();
  headers.append("Authorization", `Bearer ${process.env.NOTION_API_KEY}`);
  headers.append("Notion-Version", `${process.env.NOTION_VERSION}`);
  headers.append("Content-Type", "application/json");
 
  
  const response = await fetch("https://api.notion.com/v1/databases/74a6577f09ee4e85888179fb21b72b6b/query", {
      method: 'POST',
      headers,
  });

  const postsDatabase = await response.json() as PostsNotionDatabaseResult;

  return postsDatabase.results.map(post => {
    return {
      title: post.properties.Page.title[0].plain_text,
      slug: post.properties.Slug.rich_text[0].plain_text,
      published: post.properties.Published.checkbox,
      date: post.properties.Date.date.start,
      coverImage: post.properties["Cover image"].files.length > 0 ? post.properties["Cover image"].files[0].file.url : "",
      resume: post.properties.Resume.rich_text[0].plain_text,
      url: post.url,
      id: post.url.split("/").pop()?.split("-").pop(),
    } as Post
  }).filter(post => post.published);
}

export { getPosts };
