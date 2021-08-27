import { FC } from "react"
import Head from 'next/head'
import { KEY_OG_TYPE } from "lib/key"
import { formatMetaPublishedTime } from "lib/date"

type Props = {
  publishedTime?: Date
  expirationTime?: Date
  section?: string
  tag?: string[]
}

const ArticleHeadMeta: FC<Props> = ({
  publishedTime,
  expirationTime,
  section,
  tag,
}) => {
  return (
    <Head>
      <meta property="og:type" content="article" key={KEY_OG_TYPE} />
      {publishedTime ?
        <meta property="article:published_time" content={formatMetaPublishedTime(publishedTime)} />
      : undefined}
      {expirationTime ?
        <meta property="article:expiration_time" content={formatMetaPublishedTime(expirationTime)} />
      : undefined}
      <meta property="article:author" content={`${process.env.NEXT_PUBLIC_SITE_URL}/about`} />
      {section ?
        <meta property="article:section" content={section} />
      : undefined}
      {tag && tag.length > 0 ?
        tag.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))
      : undefined}
    </Head>
  )
}

export default ArticleHeadMeta
