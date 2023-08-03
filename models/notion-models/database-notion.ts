export interface PostsNotionDatabaseResult {
  object:           string;
  results:          Result[];
  next_cursor:      null;
  has_more:         boolean;
  type:             string;
  page_or_database: PageOrDatabase;
  developer_survey: string;
}

export interface PageOrDatabase {
}

export interface Result {
    object:     string;
    id:         string;
    properties: Properties;
    url:        string;
}

export interface Properties {
    Slug:          Slug;
    Published:     Published;
    Date:          DateClass;
    "Cover image": CoverImage;
    Resume:        Resume;
    Page:          Page;
}

export interface CoverImage {
    id:    string;
    type:  string;
    files: FileElement[];
}

export interface FileElement {
    name: string;
    type: string;
    file: FileFile;
}

export interface FileFile {
    url:         string;
    expiry_time: Date;
}

export interface DateClass {
    id:   string;
    type: string;
    date: DateDate;
}

export interface DateDate {
    start:     Date;
    end:       null;
    time_zone: null;
}

export interface Page {
    id:    string;
    type:  string;
    title: Title[];
}

export interface Title {
    plain_text: string;
    href:       null;
}

export interface Published {
    id:       string;
    type:     string;
    checkbox: boolean;
}

export interface Resume {
    id:        string;
    type:      string;
    rich_text: RichText[];
}

export interface RichText {
    type:        string;
    text:        Text;
    annotations: Annotations;
    plain_text:  string;
    href:        null;
}

export interface Annotations {
    bold:          boolean;
    italic:        boolean;
    strikethrough: boolean;
    underline:     boolean;
    code:          boolean;
    color:         string;
}

export interface Text {
    content: string;
    link:    null;
}

export interface Slug {
    rich_text: Title[];
}
