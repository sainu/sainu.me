import { useRouter } from "next/dist/client/router";
import { FC, useEffect, useState } from "react";
import { GlobalNavigationLink } from "./GlobalNavigationLink";
import { BookIcon } from "./icons/BookIcon";
import { DocumentIcon } from "./icons/DocumentIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { PersonIcon } from "./icons/PersonIcon";
import { ProfileImage } from "./ProfileImage";

type Props = {}

export const GlobalHeader: FC<Props> = () => {
  const router = useRouter()

  const navClass = ['transition-all h-screen w-min max-w-xs']
  navClass.push('fixed top-auto right-0 bottom-0 sm:sticky sm:top-0 sm:right-auto sm:bottom-auto')
  navClass.push('p-2 sm:px-4 sm:py-8')
  navClass.push('inline-flex flex-col-reverse sm:flex-col items-center sm:items-start flex-end gap-2')

  const [hideMenu, setHideMenu] = useState(true)

  const isMobile = process.browser ? window.innerWidth < 640 : false
  const linkClass = []

  if (isMobile) {
    if (hideMenu)
      linkClass.push('animate-nav-link-fade-out animation-forwards')
    else
      linkClass.push('animate-nav-link-fade-in')
  }

  return (
    <header className='z-10'>
      <nav className={navClass.join(' ')}>
        <div className='w-full text-center'>
          <div
            className="inline-block mb-0 sm:mb-4 w-20 sm:w-24 shadow sm:shadow-none rounded-full"
            style={{ fontSize: '0px' }}
            onClick={() => setHideMenu(isMobile && !hideMenu)}
          >
            <ProfileImage width={96} height={96} />
          </div>
        </div>

        <div className={linkClass.join(' ')}>
          <GlobalNavigationLink
            href='/'
            active={router.pathname === '/'}
            icon={<HomeIcon width={28} height={28} />}
            activeIcon={<HomeIcon width={28} height={28} fill={true} />}
          >
            Home
          </GlobalNavigationLink>
        </div>
        <div className={linkClass.join(' ')}>
          <GlobalNavigationLink
            href='/posts/page/1'
            active={router.pathname.startsWith('/posts/page/')}
            icon={<BookIcon width={28} height={28} />}
            activeIcon={<BookIcon width={28} height={28} fill={true} />}
          >
            Posts
          </GlobalNavigationLink>
        </div>
        <div className={linkClass.join(' ')}>
          <GlobalNavigationLink
            href='/about'
            active={router.pathname === '/about'}
            icon={<PersonIcon width={28} height={28} />}
            activeIcon={<PersonIcon width={28} height={28} fill={true} />}
          >
            About
          </GlobalNavigationLink>
        </div>
        <div className={linkClass.join(' ')}>
          <GlobalNavigationLink
            href='/resume'
            active={router.pathname === '/resume'}
            icon={<DocumentIcon width={28} height={28} />}
            activeIcon={<DocumentIcon width={28} height={28} fill={true} />}
          >
            Resume
          </GlobalNavigationLink>
        </div>
      </nav>
    </header>
  )
}
