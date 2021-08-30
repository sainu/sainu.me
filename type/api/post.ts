export type Post = {
  slug: string
  title: string
  publishedAt: string
  content: string
}

export interface PostMdMeta {
  title: string
  published_at: string
}
