import { FC } from 'react'
import Link from 'next/link'

type Props = {
  href: string
}

export const MoreLink: FC<Props> = ({
  href,
  children,
}) => {
  return (
    <Link href={href}>
      <a className='text-sm underline mt-4 inline-block'>
        {children}
      </a>
    </Link>
  )
}
