import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FC } from "react";
import { GlobalNavigationLink } from "./GlobalNavigationLink";
import { BookIcon } from "./icons/BookIcon";
import { DocumentIcon } from "./icons/DocumentIcon";
import { PersonIcon } from "./icons/PersonIcon";
import { ProfileImage } from "./ProfileImage";

type Props = {}

export const GlobalHeader: FC<Props> = () => {
  const router = useRouter()

  return (
    <header className="p-2 w-min max-w-xs sm:px-4 sm:py-8 h-screen sticky top-0 flex flex-col items-center border-r sm:border-none transition-all">
      <div className='inline-flex mb-4'>
        <Link href='/'>
          <a className="p-3 rounded-full hover:bg-gray-50">
            <div className="w-10 sm:w-24" style={{ fontSize: '0px' }}>
              <ProfileImage width={96} height={96} />
            </div>
          </a>
        </Link>
      </div>

      <nav className="inline-flex flex-col items-end sm:items-start w-min">
        <GlobalNavigationLink
          href='/posts/page/1'
          active={router.pathname.startsWith('/posts/page/')}
          icon={<BookIcon width={28} height={28} />}
          activeIcon={<BookIcon width={28} height={28} fill={true} />}
        >
          Posts
        </GlobalNavigationLink>
        <GlobalNavigationLink
          href='/about'
          active={router.pathname === '/about'}
          icon={<PersonIcon width={28} height={28} />}
          activeIcon={<PersonIcon width={28} height={28} fill={true} />}
        >
          About me
        </GlobalNavigationLink>
        <GlobalNavigationLink
          href='/resume'
          active={router.pathname === '/resume'}
          icon={<DocumentIcon width={28} height={28} />}
          activeIcon={<DocumentIcon width={28} height={28} fill={true} />}
        >
          Resume
        </GlobalNavigationLink>
      </nav>
    </header>
  )
}
