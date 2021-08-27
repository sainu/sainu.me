import type { InferGetStaticPropsType, NextPage } from 'next'
import {
  fetchProfile,
} from 'services'
import Image from 'next/image'
import Footer from 'components/Footer'
import CommonHeadMeta from 'components/CommonHeadMeta'
import ProfileHeadMeta from 'components/ProfileHeadMeta'
import { ArticleLayout } from 'components/ArticleLayout'
import { StaticPageTitle } from 'components/StaticPageTitle'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const responses = await Promise.all([
    fetchProfile(),
  ])

  return {
    props: {
      profile: responses[0],
    }
  }
}

const title = 'About me'

const Home: NextPage<Props> = ({
  profile,
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
      </ArticleLayout>

      <Footer copyRight={profile.fullNameEn} />
    </>
  )
}

export default Home
