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
      <a className='p-3 sm:px-4 sm:py-3 min-w-max flex items-center rounded-full text-xl hover:bg-gray-50'>
        <span className='w-8'>
          {active ? activeIcon : icon}
        </span>
        <span className={`ml-2 hidden sm:inline ${active ? 'font-bold' : ''}`}>
          {children}
        </span>
      </a>
    </Link>
  )
}
