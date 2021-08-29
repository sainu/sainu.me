import { Meta } from "lib/markdown"

export type Post = {
  slug: string
  title: string
  publishedAt: string
  content: string
}

export interface PostMdMeta extends Meta {
  title: string
  published_at: string
}
