import { FC } from 'react'

type Props = {}

export const ActiveWorkList: FC<Props> = ({
  children,
}) => {
  return (
    <div className='flex flex-col gap-3'>
      {children}
    </div>
  )
}
