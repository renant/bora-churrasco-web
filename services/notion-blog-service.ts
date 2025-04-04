import { storage } from '@/lib/firebase';
import type {
  PostsNotionDatabaseResult,
  Result,
} from '@/models/notion-models/database-notion';
import type Recipe from '@/models/recipe';
import { Client } from '@notionhq/client';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import matter from 'gray-matter';
import { NotionToMarkdown } from 'notion-to-md';
import { remark } from 'remark';
import html from 'remark-html';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

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
}

export interface PostContent extends Post {
  content: string;
}

export interface PostsResult {
  next_cursor: string;
  has_more: boolean;
  posts: Post[];
}

export type GetQuery = {
  limitSize?: number;
  start_cursor?: string;
};

const getPosts = async (queryParam: GetQuery = {}): Promise<PostsResult> => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${process.env.NOTION_API_KEY}`);
  headers.append('Notion-Version', `${process.env.NOTION_VERSION}`);
  headers.append('Content-Type', 'application/json');

  const parameters: any = {
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  };

  if (queryParam.limitSize !== undefined) {
    parameters.page_size = queryParam.limitSize;
  }

  if (queryParam.start_cursor !== undefined) {
    parameters.start_cursor = queryParam.start_cursor;
  }

  const response = await fetch(
    'https://api.notion.com/v1/databases/74a6577f09ee4e85888179fb21b72b6b/query',
    {
      cache: 'no-store',
      method: 'POST',
      headers,
      body: JSON.stringify(parameters),
    }
  );

  const json = await response.json();

  const postsDatabase = json as PostsNotionDatabaseResult;

  const posts: Post[] = [];

  for (const post of postsDatabase.results) {
    const postResult = {
      title: post.properties.Page.title[0].plain_text,
      slug:
        post.properties.Slug.rich_text.length > 0
          ? post.properties.Slug.rich_text[0].plain_text
          : '',
      published: post.properties.Published.checkbox,
      date: post.properties.Date.date
        ? new Date(post.properties.Date.date.start)
        : null,
      coverImage:
        post.properties['Cover image'].files.length > 0
          ? post.properties['Cover image'].files[0].file.url
          : '',
      tags: post.properties.tags.multi_select.map((tag) => tag.name),
      firebaseCoverImageUrl: post.properties.FirebaseCoverImageUrl?.rich_text[0]
        ? post.properties.FirebaseCoverImageUrl.rich_text[0].plain_text
        : null,
      resume: post.properties.Resume.rich_text[0].plain_text,
      url: post.url,
      id: post.url.split('/').pop()?.split('-').pop(),
      slugId:
        post.properties.Slug.rich_text.length > 0
          ? post.properties.Slug.rich_text[0].plain_text
          : '',
    } as PostContent;

    const postContent = await updateImageToFirebaseCoverImage(postResult);
    posts.push(postContent);
  }

  return {
    next_cursor: postsDatabase.next_cursor,
    has_more: postsDatabase.has_more,
    posts,
  };
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const getPost = async (slug: string): Promise<PostContent> => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${process.env.NOTION_API_KEY}`);
  headers.append('Notion-Version', `${process.env.NOTION_VERSION}`);
  headers.append('Content-Type', 'application/json');

  const parameters: any = {
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  };

  const response = await fetch(
    'https://api.notion.com/v1/databases/74a6577f09ee4e85888179fb21b72b6b/query',
    {
      cache: 'no-store',
      method: 'POST',
      headers,
      body: JSON.stringify(parameters),
    }
  );

  const json = await response.json();

  const postsDatabase = json as PostsNotionDatabaseResult;

  const post = (postsDatabase.results[0] ?? null) as Result;

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(post.id ?? '');
  const mdString = n2m.toMarkdownString(mdblocks);

  const matterResult = matter(mdString.parent);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const content = processedContent.value
    .toString()
    .replace(/(?:\r\n|\r|\n)/g, '')
    .replace(/"/g, "'")
    .replace('|startVideoEmbeded|', "<iframe width='560' height='315' src='")
    .replace(
      '|endVideoEmbeded|',
      "' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>"
    );

  let postContent = {
    title: post.properties.Page.title[0].plain_text,
    slug: post.properties.Slug.rich_text[0].plain_text,
    published: post.properties.Published.checkbox,
    date: post.properties.Date.date.start,
    coverImage:
      post.properties['Cover image'].files.length > 0
        ? post.properties['Cover image'].files[0].file.url
        : '',
    firebaseCoverImageUrl: post.properties.FirebaseCoverImageUrl
      ? post.properties.FirebaseCoverImageUrl.rich_text[0].plain_text
      : null,
    resume: post.properties.Resume.rich_text[0].plain_text,
    url: post.url,
    id: post.url.split('/').pop()?.split('-').pop(),
    slugId:
      post.properties.Slug.rich_text.length > 0
        ? post.properties.Slug.rich_text[0].plain_text
        : '',
    content,
  } as PostContent;

  postContent = await updateImageToFirebaseCoverImage(postContent);

  return postContent;
};

const getRecipes = async (queryParam: GetQuery = {}) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${process.env.NOTION_API_KEY}`);
  headers.append('Notion-Version', `${process.env.NOTION_VERSION}`);
  headers.append('Content-Type', 'application/json');

  const parameters: any = {
    filter: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  };

  if (queryParam.limitSize !== undefined) {
    parameters.page_size = queryParam.limitSize;
  }

  if (queryParam.start_cursor !== undefined) {
    parameters.start_cursor = queryParam.start_cursor;
  }

  const response = await fetch(
    'https://api.notion.com/v1/databases/036b43302a46488882d0c4f5cd8872dc/query',
    {
      cache: 'no-store',
      method: 'POST',
      headers,
      body: JSON.stringify(parameters),
    }
  );

  const json = await response.json();

  const recipes: Recipe[] = [];

  for (const recipe of json.results) {
    const recipeResult = {
      name: recipe.properties.Recipe.title[0].plain_text,
      slug:
        recipe.properties.slug.rich_text.length > 0
          ? recipe.properties.slug.rich_text[0].plain_text
          : '',
      imagePath: recipe.properties.imageUrl?.rich_text[0]
        ? recipe.properties.imageUrl.rich_text[0].plain_text
        : null,
      createdAt: recipe.properties.Date.date.start,
    } as Recipe;

    recipes.push(recipeResult);
  }

  return {
    next_cursor: json.next_cursor,
    has_more: json.has_more,
    recipes,
  };
};

const getRecipe = async (slug: string): Promise<Recipe> => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${process.env.NOTION_API_KEY}`);
  headers.append('Notion-Version', `${process.env.NOTION_VERSION}`);
  headers.append('Content-Type', 'application/json');

  const parameters: any = {
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  };

  const response = await fetch(
    'https://api.notion.com/v1/databases/036b43302a46488882d0c4f5cd8872dc/query',
    {
      cache: 'no-store',
      method: 'POST',
      headers,
      body: JSON.stringify(parameters),
    }
  );

  const json = await response.json();

  const recipeResult = json.results[0] ?? null;

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(recipeResult.id ?? '');
  const mdString = n2m.toMarkdownString(mdblocks);

  const matterResult = matter(mdString.parent);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const content = processedContent.value
    .toString()
    .replace(/(?:\r\n|\r|\n)/g, '')
    .replace(/"/g, "'")
    .replace('|startVideoEmbeded|', "<iframe width='560' height='315' src='")
    .replace(
      '|endVideoEmbeded|',
      "' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>"
    );

  const recipe = {
    name: recipeResult.properties.Recipe.title[0].plain_text,
    slug:
      recipeResult.properties.slug.rich_text.length > 0
        ? recipeResult.properties.slug.rich_text[0].plain_text
        : '',
    imagePath: recipeResult.properties.imageUrl?.rich_text[0]
      ? recipeResult.properties.imageUrl.rich_text[0].plain_text
      : null,
    createdAt: recipeResult.properties.Date.date.start,
    content,
  } as Recipe;

  return recipe;
};

const updateImageToFirebaseCoverImage = async (
  postContent: PostContent
): Promise<PostContent> => {
  if (postContent.firebaseCoverImageUrl) {
    return postContent as PostContent;
  }

  const responseUrl = await fetch(postContent.coverImage);
  const blob = await responseUrl.blob();

  if (blob instanceof Blob) {
    const imageName = uuidv4();
    const imageStorage = ref(storage, 'images-notion/');
    const imageRef = ref(imageStorage, imageName);

    const metadata = {
      contentType: blob.type,
    };

    const compressedImage = await sharp(await blob.arrayBuffer())
      .resize({ width: 800 })
      .avif({ quality: 60 })
      .toBuffer();

    await uploadBytesResumable(imageRef, compressedImage, metadata);

    postContent.firebaseCoverImageUrl = await getDownloadURL(imageRef);

    await notion.pages.update({
      page_id: postContent.id,
      properties: {
        FirebaseCoverImageUrl: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: postContent.firebaseCoverImageUrl,
              },
            },
          ],
        },
      },
    });
  }

  return postContent;
};

export { getPost, getPosts, getRecipe, getRecipes };
