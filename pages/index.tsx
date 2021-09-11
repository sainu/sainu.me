import type { InferGetStaticPropsType, NextPage } from 'next'
import { fetchExperiences, fetchPosts, fetchProfile, fetchSkills } from 'services'
import { CommonHeadMeta } from 'components/CommonHeadMeta'
import { DefaultLayout } from 'components/DefaultLayout'
import { WebsiteHeadMeta } from 'components/WebsiteHeadMeta'
import { PostList } from 'components/PostList'
import { PostListItem } from 'components/PostListItem'
import React from 'react'
import { Section } from 'components/Section'
import { SectionTitle } from 'components/SectionTitle'
import { SkillRankListItem } from 'components/SkillRankListItem'
import { SkillRankList } from 'components/SkillRankList'
import { MoreLink } from 'components/MoreLink'
import { ActiveWorkList } from 'components/ActiveWorkList'
import { ActiveWorkListItem } from 'components/ActiveWorkListItem'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const [
    profile,
    posts,
    skills,
    experiences,
  ] = await Promise.all([
    fetchProfile(),
    fetchPosts({ perPage: 5 }),
    fetchSkills(),
    fetchExperiences(),
  ])

  return {
    props: {
      profile,
      posts: posts,
      skills: skills.slice(0, 3),
      experiences: experiences.filter(e => e.endDate === null),
    }
  }
}

const HomePage: NextPage<Props> = ({
  profile,
  posts,
  skills,
  experiences,
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
            <h1>アクティブな活動</h1>
          </SectionTitle>

          <ActiveWorkList>
            {experiences.map((experience, i) => (
              <ActiveWorkListItem key={i} experience={experience} />
            ))}
          </ActiveWorkList>

          <MoreLink href='/about#experiences'>
            過去の活動を見る
          </MoreLink>
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

          <MoreLink href='/about#skills'>
            全ての技術を見る
          </MoreLink>
        </section>
      </Section>
    </DefaultLayout>
  )
}

export default HomePage
