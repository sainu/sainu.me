import { KEY_OG_TYPE } from "lib/key"
import { FC } from "react"
import Head from 'next/head'

type Props = {}

export const WebsiteHeadMeta: FC<Props> = () => {
  return (
    <Head>
      <meta property="og:type" content="website" key={KEY_OG_TYPE} />
    </Head>
  )
}
