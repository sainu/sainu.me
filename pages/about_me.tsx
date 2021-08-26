import type { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import {
  fetchExperiences,
  fetchProfile,
  fetchSkills,
  fetchSocialLinks,
  fetchWebLinks,
} from 'services'
import Image from 'next/image'
import { formatExperienceDate } from 'lib/date'
import Footer from 'components/Footer'
import CommonHeadMeta from 'components/CommonHeadMeta'
import ProfileHeadMeta from 'components/ProfileHeadMeta'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const responses = await Promise.all([
    fetchProfile(),
    fetchSkills(),
    fetchSocialLinks(),
    fetchWebLinks(),
    fetchExperiences(),
  ])

  return {
    props: {
      profile: responses[0],
      skills: responses[1],
      socialLinks: responses[2],
      webLinks: responses[3],
      experiences: responses[4],
    }
  }
}

const title = 'About me'

const Home: NextPage<Props> = ({
  profile,
  skills,
  socialLinks,
  webLinks,
  experiences,
}) => {
  return (
    <>
      <CommonHeadMeta title={title} />
      <ProfileHeadMeta
        firstName={profile.givenNameKanji}
        lastName={profile.familyNameKanji}
        username={profile.nickname}
      />

      <main className="max-w-screen-md mx-auto my-0 pt-8 px-4">
        <h1 className="text-3xl">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row mt-12">
          <div className="flex-shrink-0">
            <div className="flex justify-center pb-5 sm:items-start">
              <Image
                className="rounded-full sm:rounded-none"
                src={'/images/profileImage.jpg'}
                alt={profile.nickname}
                width={100}
                height={100} />
            </div>
          </div>
          <div className="px-0 sm:px-4">
            <p className="text-gray-400">
              {profile.job}
            </p>
            <p className="text-2xl">
              {profile.givenNameEn} {profile.familyNameEn}
            </p>
            <p className="">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-16 mt-12">
          <div>
            <h2 className="text-xl mb-2">
              Skills
            </h2>

            <ul className="list-disc pl-7">
              {skills.map(skill => (
                <li key={skill.name}>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl mb-2">
              Links
            </h2>

            <ul className="list-disc pl-7">
              {socialLinks.map(socialLink => (
                <li key={socialLink.name}>
                  <Link href={socialLink.url} passHref>
                    <a className="underline" style={{ textUnderlinePosition: 'under' }} target='_blank'>
                      {socialLink.name}
                    </a>
                  </Link>
                </li>
              ))}
              {webLinks.map(webLink => (
                <li key={webLink.name}>
                  <Link href={webLink.url} passHref>
                    <a className="underline" style={{ textUnderlinePosition: 'under' }} target='_blank'>
                      {webLink.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl mb-2">
            Experiences
          </h2>

          <div>
            {experiences.map((experience, i) => {
              return (
                <div key={i} className="pt-8 sm:pt-6">
                  <div className="flex flex-col-reverse sm:flex-row sm:gap-2 sm:items-center pb-1.5">
                    <div className="font-bold">
                      {experience.companyName}
                    </div>
                    <div className="text-gray-400 text-sm">
                      <span>
                        {experience.employmentType}
                      </span>
                      ・
                      <span className="ml-1">
                        {formatExperienceDate(experience.startDate)}
                        〜
                        {experience.endDate ? formatExperienceDate(experience.endDate) : ''}
                      </span>
                    </div>
                  </div>

                  {experience.projects.length > 0 ?
                    <ul className="list-disc pl-7">
                      {experience.projects.map((project, i) => (
                        <li key={i} className="pb-1">
                          {project.description}
                          {project.technologies.length > 0 ?
                            <div className="flex items-start flex-wrap">
                              {project.technologies.map((technology, j) => (
                                <span key={j} className="inline-block text-gray-500 rounded-lg text-xs mr-2">
                                  #{technology.name}
                                </span>
                              ))}
                            </div>
                          : ''}
                        </li>
                      ))}
                    </ul>
                  : ''}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer copyRight={profile.fullNameEn} />
    </>
  )
}

export default Home
