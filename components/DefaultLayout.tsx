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
    <div className='flex flex-row justify-start sm:justify-center transition-all '>
      <GlobalHeader profile={profile} />

      <main className="my-0 pt-8 px-4" style={{ width: '640px' }}>
        {children}

        <Footer copyRight={profile.fullNameEn} />
      </main>
    </div>
  )
}
