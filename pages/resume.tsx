import { ArticleHeadMeta } from "components/ArticleHeadMeta";
import { DefaultLayout } from "components/DefaultLayout";
import { CommonHeadMeta } from "components/CommonHeadMeta";
import { PageTitle } from "components/PageTitle";
import { InferGetStaticPropsType, NextPage } from "next";
import { fetchExperiences, fetchProfile, fetchSkills } from 'services'
import { ExperienceList } from "components/ExperienceList";
import { ExperienceListItem } from "components/ExperienceListItem";
import { Section } from "components/Section";
import { SkillBarList } from "components/SkillBarList";
import { SkillBarListItem } from "components/SkillBarListItem";
import { SectionTitle } from "components/SectionTitle";

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const [
    skills,
    experiences,
    profile,
  ] = await Promise.all([
    fetchSkills(),
    fetchExperiences(),
    fetchProfile(),
  ])

  return {
    props: {
      skills,
      experiences,
      profile,
    }
  }
}

const pageTitle = 'Resume'

const ResumePage: NextPage<Props> = ({
  skills,
  experiences,
  profile,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <CommonHeadMeta title={pageTitle} path='/resume' />
      <ArticleHeadMeta />

      <PageTitle>
        <h1>{pageTitle}</h1>
      </PageTitle>

      <Section>
        <section>
          <SectionTitle>
            <h2 id='skills'>Skills</h2>
          </SectionTitle>

          <SkillBarList>
            {skills.map(skill => (
              <SkillBarListItem key={skill.name} skill={skill} />
            ))}
          </SkillBarList>
        </section>
      </Section>

      <Section>
        <section>
          <SectionTitle>
            <h2>Experiences</h2>
          </SectionTitle>

          <ExperienceList>
            {experiences.map((experience, i) => (
              <ExperienceListItem key={i} experience={experience} />
            ))}
          </ExperienceList>
        </section>
      </Section>
    </DefaultLayout>
  )
}

export default ResumePage
