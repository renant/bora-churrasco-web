export interface Title {
  plain_text: string
  href: null
}

export interface Text {
  content: string
  link: null
}

export interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

export interface RichText {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href: null
}

export interface Slug {
  rich_text: Title[]
}

export interface Published {
  id: string
  type: string
  checkbox: boolean
}

export interface DateDate {
  start: Date
  end: null
  time_zone: null
}

export interface DateClass {
  id: string
  type: string
  date: DateDate
}

export interface FileFile {
  url: string
  expiry_time: Date
}

export interface FileElement {
  name: string
  type: string
  file: FileFile
}

export interface CoverImage {
  id: string
  type: string
  files: FileElement[]
}

export interface Page {
  id: string
  type: string
  title: Title[]
}
export interface Resume {
  id: string
  type: string
  rich_text: RichText[]
}

export interface Properties1 {
  Slug: Slug
  FirebaseCoverImageUrl: Slug
  Published: Published
  Date: DateClass
  'Cover image': CoverImage
  Resume: Resume
  Page: Page
}

export interface Properties2 {
  Slug: Slug
  FirebaseCoverImageUrl: Slug
  Published: Published
  Date: DateClass
  'Cover image': CoverImage
  Resume: Resume
  Page: Page
}

export interface Result {
  object: string
  id: string
  properties: Properties1
  url: string
}

export interface PostsNotionDatabaseResult {
  object: string
  results: Result[]
  next_cursor: string
  has_more: boolean
  type: string
  developer_survey: string
}
