import type { InferGetStaticPropsType, NextPage } from 'next'
import { fetchProfile } from 'services'
import CommonHeadMeta from 'components/CommonHeadMeta'
import { DefaultLayout } from 'components/DefaultLayout'
import { WebsiteHeadMeta } from 'components/WebsiteHeadMeta'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const responses = await Promise.all([
    fetchProfile(),
  ])

  return {
    props: {
      profile: responses[0],
    }
  }
}

const Home: NextPage<Props> = ({
  profile,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <CommonHeadMeta path='/' />
      <WebsiteHeadMeta />
    </DefaultLayout>
  )
}

export default Home
