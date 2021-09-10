import type { InferGetStaticPropsType, NextPage } from 'next'
import {
  fetchExperiences,
  fetchProfile,
  fetchSkills,
  fetchSocialLinks,
} from 'services'
import { CommonHeadMeta } from 'components/CommonHeadMeta'
import { ProfileHeadMeta } from 'components/ProfileHeadMeta'
import { DefaultLayout } from 'components/DefaultLayout'
import { PageTitle } from 'components/PageTitle'
import { SocialIconLink } from 'components/SocialIconLink'
import { SocialIconLinkList } from 'components/SocialIconLinkList'
import { EmailWithLink } from 'components/EmailWithLink'
import { ProfileImage } from 'components/ProfileImage'
import { Section } from 'components/Section'
import { SectionTitle } from 'components/SectionTitle'
import { SkillBarList } from 'components/SkillBarList'
import { SkillBarListItem } from 'components/SkillBarListItem'
import { ExperienceList } from 'components/ExperienceList'
import { ExperienceListItem } from 'components/ExperienceListItem'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const [
    profile,
    socialLinks,
    skills,
    experiences,
  ] = await Promise.all([
    fetchProfile(),
    fetchSocialLinks(),
    fetchSkills(),
    fetchExperiences(),
  ])

  return {
    props: {
      profile,
      socialLinks,
      skills,
      experiences,
    }
  }
}

const title = 'About'

const AboutPage: NextPage<Props> = ({
  profile,
  socialLinks,
  skills,
  experiences,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <CommonHeadMeta title={title} path='/about' />
      <ProfileHeadMeta
        firstName={profile.givenNameKanji}
        lastName={profile.familyNameKanji}
        username={profile.nickname}
      />

      <PageTitle>{title}</PageTitle>

      <Section>
        <section>
          <div className="flex flex-col sm:flex-row mt-12 gap-6">
            <div className="flex-shrink-0">
              <div className="flex sm:items-start">
                <ProfileImage url={profile.profileImageUrl} width={100} height={100} />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <div className="text-gray-400">{profile.job}</div>
                <div className="text-xl font-bold">{profile.givenNameEn} {profile.familyNameEn}</div>
                <div>{profile.bio}</div>
              </div>

              <div className="flex gap-3 flex-col flex-wrap sm:flex-row-reverse sm:justify-end">
                <EmailWithLink email={profile.email} />

                <SocialIconLinkList>
                  {socialLinks.map((socialLink, i) => (
                    <SocialIconLink key={i} socialLink={socialLink} />
                  ))}
                </SocialIconLinkList>
              </div>
            </div>
          </div>
        </section>
      </Section>

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
            <h2 id='experiences'>Experiences</h2>
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

export default AboutPage
