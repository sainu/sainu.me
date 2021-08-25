import type { InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { fetchProfile, fetchSkills, fetchSocialLinks, fetchWebLinks } from 'services'
import Image from 'next/image'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const responses = await Promise.all([
    fetchProfile(),
    fetchSkills(),
    fetchSocialLinks(),
    fetchWebLinks(),
  ])

  return {
    props: {
      profile: responses[0],
      skills: responses[1],
      socialLinks: responses[2],
      webLinks: responses[3],
    }
  }
}

const Home: NextPage<Props> = ({
  profile,
  skills,
  socialLinks,
  webLinks,
}) => {
  return (
    <div className="max-w-screen-md mx-auto my-0 pt-8 px-4">
      <h1 className="text-3xl">
        About me
      </h1>
      <div className="flex flex-col sm:flex-row py-6">
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
            {profile.nickname}
          </p>
          <p className="">
            {profile.bio}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-16">
        <div>
          <h2 className="text-xl">
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
          <h2 className="text-xl">
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
    </div>
  )
}

export default Home
