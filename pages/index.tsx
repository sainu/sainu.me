import type { InferGetStaticPropsType, NextPage } from 'next'
import { fetchProfile } from 'services'
import CommonHeadMeta from 'components/CommonHeadMeta'
import { ArticleLayout } from 'components/ArticleLayout'
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
    <ArticleLayout profile={profile}>
      <CommonHeadMeta path='/' />
      <WebsiteHeadMeta />
    </ArticleLayout>
  )
}

export default Home
