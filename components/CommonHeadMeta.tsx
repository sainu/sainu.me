import { FC } from "react"
import Head from 'next/head'

type Props = {
  title?: string
  imageUrl?: string
  path: string
  siteName?: string
  delimiter?: string
}

export const CommonHeadMeta: FC<Props> = ({
  title,
  path,
  imageUrl = process.env.NEXT_PUBLIC_OGP_IMAGE_URL,
  siteName = process.env.NEXT_PUBLIC_SITE_NAME,
  delimiter = '|',
}) => {
  const titleAndSiteName = title ? `${title} ${delimiter} ${siteName}` : siteName

  return (
    <Head>
      <title>{titleAndSiteName}</title>
      <meta property="og:title" content={titleAndSiteName} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${path}`} />
      <meta property="og:site_name" content={siteName} />
    </Head>
  )
}
