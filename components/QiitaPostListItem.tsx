import { formatISO, formatQiitaPostTime } from 'lib/date'
import { FC } from 'react'
import { QiitaPost } from 'type/api/qiitaPost'
import Link from 'next/link'

type Props = {
  qiitaPost: QiitaPost
}

export const QiitaPostListItem: FC<Props> = ({
  qiitaPost,
}) => {
  return (
    <div className='py-4 border-b'>
      <div className='flex gap-2 text-gray-500 text-sm'>
        <div>
          <time dateTime={formatISO(qiitaPost.published)}>
            {formatQiitaPostTime(qiitaPost.published)}
          </time>
          に投稿
        </div>
        /
        <div>
          <time dateTime={formatISO(qiitaPost.updated)}>
            {formatQiitaPostTime(qiitaPost.updated)}
          </time>
          に更新
        </div>
      </div>

      <div>
        <Link href={qiitaPost.url}>
          <a target='_blank' className='font-bold text-lg hover:underline'>
            {qiitaPost.title}
          </a>
        </Link>
      </div>
    </div>
  )
}
