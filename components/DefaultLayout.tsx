import { FC } from "react"
import { Footer } from 'components/Footer'
import { Profile } from "type/api/profile"
import { GlobalHeader } from "./GlobalHeader"

type Props = {
  profile: Profile
}

export const DefaultLayout: FC<Props> = ({
  profile,
  children,
}) => {
  return (
    <div className='flex flex-row justify-start sm:justify-center transition-all mx-auto 2xl:w-5/12 xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-full'>
      <GlobalHeader profile={profile} />

      <main className="my-0 pt-8 px-4">
        {children}

        <Footer copyRight={profile.fullNameEn} />
      </main>
    </div>
  )
}
