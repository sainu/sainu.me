import type { InferGetStaticPropsType, NextPage } from 'next'
import { fetchPosts, fetchProfile } from 'services'
import CommonHeadMeta from 'components/CommonHeadMeta'
import { DefaultLayout } from 'components/DefaultLayout'
import { WebsiteHeadMeta } from 'components/WebsiteHeadMeta'
import { PostList } from 'components/PostList'
import { PostListItem } from 'components/PostListItem'
import React from 'react'
import { Section } from 'components/Section'
import { SectionTitle } from 'components/SectionTitle'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const [
    profile,
    posts,
  ] = await Promise.all([
    fetchProfile(),
    fetchPosts({ perPage: 5 }),
  ])

  return {
    props: {
      profile,
      posts: posts,
    }
  }
}

const Home: NextPage<Props> = ({
  profile,
  posts,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <CommonHeadMeta path='/' />
      <WebsiteHeadMeta />

      <Section>
        <section>
          <SectionTitle>
            <h1>最新の投稿</h1>
          </SectionTitle>

          <PostList>
            {posts.data.map(post => (
              <PostListItem key={post.slug} post={post} />
            ))}
          </PostList>
        </section>
      </Section>
    </DefaultLayout>
  )
}

export default Home
