import { FC } from "react"
import Footer from 'components/Footer'
import { Profile } from "type/api/profile"
import { GlobalHeader } from "./GlobalHeader"

type Props = {
  profile: Profile
}

export const ArticleLayout: FC<Props> = ({ profile, children }) => {
  return (
    <div className='flex justify-start sm:justify-center transition-all '>
      <GlobalHeader />

      <main className="my-0 pt-8 px-4" style={{ width: '640px' }}>
        {children}

        <Footer copyRight={profile.fullNameEn} />
      </main>
    </div>
  )
}
