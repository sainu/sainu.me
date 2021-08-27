import type { InferGetStaticPropsType, NextPage } from 'next'
import {
  fetchProfile,
  fetchSocialLinks,
} from 'services'
import Image from 'next/image'
import Footer from 'components/Footer'
import CommonHeadMeta from 'components/CommonHeadMeta'
import ProfileHeadMeta from 'components/ProfileHeadMeta'
import { ArticleLayout } from 'components/ArticleLayout'
import { StaticPageTitle } from 'components/StaticPageTitle'
import { SocialIconLink } from 'components/SocialIconLink'
import { SocialIconLinkList } from 'components/SocialIconLinkList'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const responses = await Promise.all([
    fetchProfile(),
    fetchSocialLinks(),
  ])

  return {
    props: {
      profile: responses[0],
      socialLinks: responses[1],
    }
  }
}

const title = 'About me'

const Home: NextPage<Props> = ({
  profile,
  socialLinks,
}) => {
  return (
    <>
      <CommonHeadMeta title={title} path='/about_me' />
      <ProfileHeadMeta
        firstName={profile.givenNameKanji}
        lastName={profile.familyNameKanji}
        username={profile.nickname}
      />

      <ArticleLayout>
        <StaticPageTitle>{title}</StaticPageTitle>

        <div className="flex flex-col sm:flex-row mt-12">
          <div className="flex-shrink-0">
            <div className="flex pb-5 sm:items-start">
              <Image
                className="rounded-full"
                src={'/images/profileImage.jpg'}
                alt={profile.nickname}
                width={100}
                height={100} />
            </div>
          </div>
          <div className="px-0 sm:px-4">
            <div className="text-gray-400">
              {profile.job}
            </div>
            <div className="text-xl font-bold">
              {profile.givenNameEn} {profile.familyNameEn}
            </div>
            <div>{profile.bio}</div>

            <div className="mt-4">
              <SocialIconLinkList>
                {socialLinks.map((socialLink, i) => (
                  <SocialIconLink key={i} socialLink={socialLink} />
                ))}
              </SocialIconLinkList>
            </div>
          </div>
        </div>
      </ArticleLayout>

      <Footer copyRight={profile.fullNameEn} />
    </>
  )
}

export default Home
