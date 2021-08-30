import ArticleHeadMeta from "components/ArticleHeadMeta";
import { DefaultLayout } from "components/DefaultLayout";
import CommonHeadMeta from "components/CommonHeadMeta";
import { PageTitle } from "components/PageTitle";
import { InferGetStaticPropsType, NextPage } from "next";
import { fetchExperiences, fetchProfile, fetchSkills } from 'services'
import { ExperienceList } from "components/ExperienceList";
import { ExperienceListItem } from "components/ExperienceListItem";
import { Section } from "components/Section";
import { SkillList } from "components/SkillList";
import { SkillListItem } from "components/SkillListItem";
import { SectionTitle } from "components/SectionTitle";

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

      <PageTitle>
        <h1>{pageTitle}</h1>
      </PageTitle>

      <Section>
        <section>
          <SectionTitle>
            <h2>Skills</h2>
          </SectionTitle>

          <SkillList>
            {skills.map(skill => (
              <SkillListItem key={skill.name} skill={skill} />
            ))}
          </SkillList>
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

export default Resume
