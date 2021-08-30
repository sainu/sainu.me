import { KEY_OG_TYPE } from "lib/key"
import { FC } from "react"
import Head from 'next/head'

type Props = {
  firstName: string
  lastName: string
  username: string
}

export const ProfileHeadMeta: FC<Props> = ({
  firstName,
  lastName,
  username,
}) => {
  return (
    <Head>
      <meta property="og:type" content="profile" key={KEY_OG_TYPE} />
      <meta property="profile:first_name" content={firstName} />
      <meta property="profile:last_name" content={lastName} />
      <meta property="profile:username" content={username} />
      <meta property="profile:gender" content='male' />
    </Head>
  )
}
