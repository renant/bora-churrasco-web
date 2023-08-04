import {
  PostsNotionDatabaseResult,
  Result,
} from '@/models/notion-models/database-notion'
import { Client } from '@notionhq/client'
import matter from 'gray-matter'
import { NotionToMarkdown } from 'notion-to-md'
import { remark } from 'remark'
import html from 'remark-html'

export interface Post {
  title: string
  slug: string
  published: boolean
  date: Date
  coverImage: string
  resume: string
  url: string
  id: string
  slugId: string
}

export interface PostContent extends Post {
  content: string
}

const getPosts = async (): Promise<Post[]> => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${process.env.NOTION_API_KEY}`)
  headers.append('Notion-Version', `${process.env.NOTION_VERSION}`)
  headers.append('Content-Type', 'application/json')

  const response = await fetch(
    'https://api.notion.com/v1/databases/74a6577f09ee4e85888179fb21b72b6b/query',
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
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
      }),
    },
  )

  const postsDatabase = (await response.json()) as PostsNotionDatabaseResult

  return postsDatabase.results.map((post) => {
    return {
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
      resume: post.properties.Resume.rich_text[0].plain_text,
      url: post.url,
      id: post.url.split('/').pop()?.split('-').pop(),
      slugId: post.url.split('/').pop(),
    } as Post
  })
}

const getPost = async (slugId: string): Promise<PostContent> => {
  const id = slugId.split('-').pop()

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  })

  const n2m = new NotionToMarkdown({ notionClient: notion })

  const mdblocks = await n2m.pageToMarkdown(id ?? '')
  const mdString = n2m.toMarkdownString(mdblocks)

  const matterResult = matter(mdString.parent)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const content = processedContent.value
    .toString()
    .replace(/(?:\r\n|\r|\n)/g, '')
    .replace(/"/g, "'")
    .replace('|startVideoEmbeded|', "<iframe width='560' height='315' src='")
    .replace(
      '|endVideoEmbeded|',
      "' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>",
    )

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${process.env.NOTION_API_KEY}`)
  headers.append('Notion-Version', `${process.env.NOTION_VERSION}`)
  headers.append('Content-Type', 'application/json')

  const response = await fetch(`https://api.notion.com/v1/pages/${id}`, {
    method: 'GET',
    headers,
  })

  const post = (await response.json()) as Result

  return {
    title: post.properties.Page.title[0].plain_text,
    slug: post.properties.Slug.rich_text[0].plain_text,
    published: post.properties.Published.checkbox,
    date: post.properties.Date.date.start,
    coverImage:
      post.properties['Cover image'].files.length > 0
        ? post.properties['Cover image'].files[0].file.url
        : '',
    resume: post.properties.Resume.rich_text[0].plain_text,
    url: post.url,
    id: post.url.split('/').pop()?.split('-').pop(),
    slugId: post.url.split('/').pop(),
    content,
  } as PostContent
}

export { getPost, getPosts }
