import { FC } from "react"
import Head from 'next/head'

type Props = {
  title: string
  imageUrl?: string
  url?: string
  siteName?: string
  delimiter?: string
}

const CommonHeadMeta: FC<Props> = ({
  title,
  imageUrl = process.env.OGP_IMAGE_URL,
  url = process.env.SITE_URL,
  siteName = process.env.SITE_NAME,
  delimiter = '|',
}) => {
  const titleAndSiteName = `${title} ${delimiter} ${siteName}`
  return (
    <Head>
      <title>{titleAndSiteName}</title>
      <meta property="og:title" content={titleAndSiteName} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
    </Head>
  )
}
export default CommonHeadMeta
