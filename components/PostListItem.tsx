import { formatISO, formatPostPublishedTime } from "lib/date"
import { FC } from "react"
import { Post } from "type/api/post"
import Link from 'next/link'

type Props = {
  post: Post
  label?: string
}

export const PostListItem: FC<Props> = ({
  post,
  label,
}) => {
  return (
    <article>
      <Link href={`/posts/${post.slug}`}>
        <a className='block p-4 rounded-md transition-all hover:shadow'>
          {label ?
            <div className='text-gray-600 font-bold'>
              {label}
            </div>
          : <></>}
          <h4 className='text-xl font-bold'>
            {post.title}
          </h4>
          <time dateTime={formatISO(post.publishedAt)} className='text-sm text-gray-500'>
            {formatPostPublishedTime(post.publishedAt)}
          </time>
        </a>
      </Link>
    </article>
  )
}
