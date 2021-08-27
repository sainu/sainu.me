import { FC } from "react"
import Footer from 'components/Footer'
import { Profile } from "type/api/profile"
import { GlobalHeader } from "./GlobalHeader"

type Props = {
  profile: Profile
}

export const ArticleLayout: FC<Props> = ({ profile, children }) => {
  return (
    <div className='flex flex-row justify-center h-screen overflow-hidden'>
      <GlobalHeader />

      <main className="max-w-screen-sm my-0 pt-8 px-4 bg-local overflow-y-scroll">
        {children}

        <Footer copyRight={profile.fullNameEn} />
      </main>
    </div>
  )
}
