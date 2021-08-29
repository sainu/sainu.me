import { formatISO, formatPostPublishedTime } from "lib/date"
import { FC } from "react"
import { Post } from "type/api/post"
import Link from 'next/link'

type Props = {
  post: Post
}

export const PostListItem: FC<Props> = ({ post }) => {
  return (
    <article className=''>
      <Link href={`/posts/${post.slug}`}>
        <a className='block p-4 rounded-md transition-all transform hover:shadow'>
          <h4 className='text-xl font-bold'>
            {post.title}
          </h4>
          <div>
            <time dateTime={formatISO(post.publishedAt)} className='text-sm text-gray-500'>
              {formatPostPublishedTime(post.publishedAt)}
            </time>
          </div>
        </a>
      </Link>
    </article>
  )
}
