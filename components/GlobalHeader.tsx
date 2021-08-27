import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FC } from "react";
import { GlobalNavigationLink } from "./GlobalNavigationLink";
import { DocumentIcon } from "./icons/DocumentIcon";
import { PersonIcon } from "./icons/PersonIcon";
import { ProfileImage } from "./ProfileImage";

type Props = {}

export const GlobalHeader: FC<Props> = () => {
  const router = useRouter()

  return (
    <header className="p-2 w-64 max-w-xs sm:px-4 sm:py-8 flex flex-col border-r sm:border-none transition-all">
      <div className='inline-flex justify-end sm:justify-center mb-4'>
        <Link href='/'>
          <a className="p-3 rounded-full hover:bg-gray-50">
            <div className="w-6 sm:w-24" style={{ fontSize: '0px' }}>
              <ProfileImage width={96} height={96} />
            </div>
          </a>
        </Link>
      </div>

      <nav className="inline-flex flex-col items-end sm:items-start">
        <GlobalNavigationLink
          href='/about'
          active={router.pathname === '/about'}
          icon={<PersonIcon />}
          activeIcon={<PersonIcon fill={true} />}
        >
          About me
        </GlobalNavigationLink>
        <GlobalNavigationLink
          href='/resume'
          active={router.pathname === '/resume'}
          icon={<DocumentIcon />}
          activeIcon={<DocumentIcon fill={true} />}
        >
          Resume
        </GlobalNavigationLink>
      </nav>
    </header>
  )
}