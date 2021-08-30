import { useRouter } from "next/dist/client/router";
import { FC, useState } from "react";
import { GlobalNavigationLink } from "./GlobalNavigationLink";
import { BookIcon } from "./icons/BookIcon";
import { DocumentIcon } from "./icons/DocumentIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { LightningChargeIcon } from "./icons/LightningChargeIcon";
import { PersonIcon } from "./icons/PersonIcon";
import { ProfileImage } from "./ProfileImage";

type Props = {}

const navClass = 'transition-all h-screen w-min max-w-xs' +
  ' fixed top-auto right-0 bottom-0 sm:sticky sm:top-0 sm:right-auto sm:bottom-auto' +
  ' p-2 sm:px-4 sm:py-8' +
  ' inline-flex flex-col-reverse sm:flex-col items-center sm:items-start flex-end'

const navIcons = (pathname: string) => {
  return [
    <GlobalNavigationLink
      key='1'
      href='/'
      active={pathname === '/'}
      icon={<HomeIcon width={28} height={28} />}
      activeIcon={<HomeIcon width={28} height={28} fill={true} />}
    >
      Home
    </GlobalNavigationLink>,
    <GlobalNavigationLink
      key='2'
      href='/posts/page/1'
      active={pathname.startsWith('/posts/page/')}
      icon={<BookIcon width={28} height={28} />}
      activeIcon={<BookIcon width={28} height={28} fill={true} />}
    >
      Posts
    </GlobalNavigationLink>,
    <GlobalNavigationLink
      key='3'
      href='/activities'
      active={pathname === '/activities'}
      icon={<LightningChargeIcon width={28} height={28} />}
      activeIcon={<LightningChargeIcon width={28} height={28} fill={true} />}
    >
      Activities
    </GlobalNavigationLink>,
    <GlobalNavigationLink
      key='4'
      href='/about'
      active={pathname === '/about'}
      icon={<PersonIcon width={28} height={28} />}
      activeIcon={<PersonIcon width={28} height={28} fill={true} />}
    >
      About
    </GlobalNavigationLink>,
    <GlobalNavigationLink
      key='5'
      href='/resume'
      active={pathname === '/resume'}
      icon={<DocumentIcon width={28} height={28} />}
      activeIcon={<DocumentIcon width={28} height={28} fill={true} />}
    >
      Resume
    </GlobalNavigationLink>,
  ]
}

const Thumbnail: FC<{
  onClick?: () => void
}> = ({
  onClick,
}) => {
  return (
    <div className='w-full text-center'>
      <div
        className="inline-block cursor-pointer sm:cursor-auto mb-0 sm:mb-4 w-20 sm:w-24 shadow sm:shadow-none rounded-full bg-gray-100 p-2"
        style={{ fontSize: '0px' }}
        onClick={() => onClick && onClick()}
      >
        <ProfileImage width={96} height={96} />
      </div>
    </div>
  )
}

export const GlobalHeader: FC<Props> = () => {
  const router = useRouter()
  const [hideMenu, setHideMenu] = useState(true)

  const mobileLinkClass = hideMenu ? 'animate-nav-link-fade-out animation-forwards' : 'animate-nav-link-fade-in'

  return (
    <header className='z-10'>
      <nav className={navClass + ' hidden sm:block'}>
        <Thumbnail />

        {navIcons(router.pathname).map((icon, i) => (
          <div key={i}>{icon}</div>
        ))}
      </nav>

      <nav className={navClass + ' block sm:hidden'}>
        <Thumbnail onClick={() => setHideMenu(!hideMenu)} />

        {navIcons(router.pathname).map((icon, i) => (
          <div key={i} className={mobileLinkClass + ' mb-2'}>{icon}</div>
        ))}
      </nav>
    </header>
  )
}
