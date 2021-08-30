import type { InferGetStaticPropsType, NextPage } from 'next'
import { fetchPosts, fetchProfile, fetchSkills } from 'services'
import { CommonHeadMeta } from 'components/CommonHeadMeta'
import { DefaultLayout } from 'components/DefaultLayout'
import { WebsiteHeadMeta } from 'components/WebsiteHeadMeta'
import { PostList } from 'components/PostList'
import { PostListItem } from 'components/PostListItem'
import React from 'react'
import { Section } from 'components/Section'
import { SectionTitle } from 'components/SectionTitle'
import { SkillRankListItem } from 'components/SkillRankListItem'
import Link from 'next/link'
import { SkillRankList } from 'components/SkillRankList'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const [
    profile,
    posts,
    skills,
  ] = await Promise.all([
    fetchProfile(),
    fetchPosts({ perPage: 5 }),
    fetchSkills(),
  ])

  return {
    props: {
      profile,
      posts: posts,
      skills: skills.slice(0, 3),
    }
  }
}

const HomePage: NextPage<Props> = ({
  profile,
  posts,
  skills,
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

      <Section>
        <section>
          <SectionTitle>
            <h1>得意な技術トップ3</h1>
          </SectionTitle>

          <SkillRankList>
            {skills.map((skill, i) => (
              <SkillRankListItem key={i} rank={i + 1} skill={skill} />
            ))}
          </SkillRankList>

          <Link href='/resume#skills'>
            <a className='text-sm underline mt-4 inline-block'>
              もっと見る
            </a>
          </Link>
        </section>
      </Section>
    </DefaultLayout>
  )
}

export default HomePage
