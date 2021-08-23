import type { InferGetStaticPropsType, NextPage } from 'next'
import { fetchProfile } from 'services'
import Image from 'next/image'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const profile = await fetchProfile()

  return {
    props: {
      profile
    }
  }
}

const Home: NextPage<Props> = ({
  profile
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
    </div>
  )
}

export default Home
