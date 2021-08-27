import type { InferGetStaticPropsType, NextPage } from 'next'
import {
  fetchProfile,
  fetchSocialLinks,
} from 'services'
import CommonHeadMeta from 'components/CommonHeadMeta'
import ProfileHeadMeta from 'components/ProfileHeadMeta'
import { ArticleLayout } from 'components/ArticleLayout'
import { StaticPageTitle } from 'components/StaticPageTitle'
import { SocialIconLink } from 'components/SocialIconLink'
import { SocialIconLinkList } from 'components/SocialIconLinkList'
import { EmailWithLink } from 'components/EmailWithLink'
import { ProfileImage } from 'components/ProfileImage'

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
    <ArticleLayout profile={profile}>
      <CommonHeadMeta title={title} path='/about' />
      <ProfileHeadMeta
        firstName={profile.givenNameKanji}
        lastName={profile.familyNameKanji}
        username={profile.nickname}
      />

      <StaticPageTitle>{title}</StaticPageTitle>

      <div className="flex flex-col sm:flex-row mt-12 gap-6">
        <div className="flex-shrink-0">
          <div className="flex sm:items-start">
            <ProfileImage width={100} height={100} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="text-gray-400">{profile.job}</div>
            <div className="text-xl font-bold">{profile.givenNameEn} {profile.familyNameEn}</div>
            <div>{profile.bio}</div>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row-reverse sm:justify-end">
            <EmailWithLink email={profile.email} />

            <SocialIconLinkList>
              {socialLinks.map((socialLink, i) => (
                <SocialIconLink key={i} socialLink={socialLink} />
              ))}
            </SocialIconLinkList>
          </div>
        </div>
      </div>
    </ArticleLayout>
  )
}

export default Home
