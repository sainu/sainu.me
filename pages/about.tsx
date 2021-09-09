import type { InferGetStaticPropsType, NextPage } from 'next'
import {
  fetchProfile,
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

const title = 'About'

const AboutPage: NextPage<Props> = ({
  profile,
  socialLinks,
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
    </DefaultLayout>
  )
}

export default AboutPage
