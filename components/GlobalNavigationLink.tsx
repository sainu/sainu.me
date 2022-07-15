import { FC } from "react";
import Link from 'next/link'

type Props = {
  href: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
}

export const GlobalNavigationLink: FC<Props> = ({
  href,
  active,
  icon,
  activeIcon,
  children,
}) => {
  return (
    <Link href={href}>
      <a className='p-3 sm:px-4 sm:py-3 rounded-full transition-all text-xl bg-white shadow sm:shadow-none hover:bg-gray-50 w-20 h-20 sm:w-full sm:h-auto flex flex-col sm:flex-row items-center sm:justify-start justify-center'>
        <span className='w-8'>
          {active ? activeIcon : icon}
        </span>
        <span className={`ml-none sm:ml-2 text-xs sm:text-base sm:inline ${active ? 'font-bold' : ''}`}>
          {children}
        </span>
      </a>
    </Link>
  )
}
