import ArticleHeadMeta from "components/ArticleHeadMeta";
import { DefaultLayout } from "components/DefaultLayout";
import CommonHeadMeta from "components/CommonHeadMeta";
import { StaticPageTitle } from "components/StaticPageTitle";
import { InferGetStaticPropsType, NextPage } from "next";
import { fetchExperiences, fetchProfile, fetchSkills } from 'services'
import { ExperienceList } from "components/ExperienceList";
import { ExperienceListItem } from "components/ExperienceListItem";
import { StaticPageSection } from "components/StaticPageSection";
import { SkillList } from "components/SkillList";
import { SkillListItem } from "components/SkillListItem";
import { SectionHeading } from "components/SectionHeading";

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const responses = await Promise.all([
    fetchSkills(),
    fetchExperiences(),
    fetchProfile(),
  ])

  return {
    props: {
      skills: responses[0],
      experiences: responses[1],
      profile: responses[2],
    }
  }
}

const pageTitle = 'Resume'

const Resume: NextPage<Props> = ({
  skills,
  experiences,
  profile,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <CommonHeadMeta title={pageTitle} path='/resume' />
      <ArticleHeadMeta />

      <StaticPageTitle>{pageTitle}</StaticPageTitle>

      <StaticPageSection>
        <SectionHeading>Skills</SectionHeading>

        <SkillList>
          {skills.map(skill => (
            <SkillListItem key={skill.name} skill={skill} />
          ))}
        </SkillList>
      </StaticPageSection>

      <StaticPageSection>
        <SectionHeading>Experiences</SectionHeading>

        <ExperienceList>
          {experiences.map((experience, i) => (
            <ExperienceListItem key={i} experience={experience} />
          ))}
        </ExperienceList>
      </StaticPageSection>
    </DefaultLayout>
  )
}

export default Resume
