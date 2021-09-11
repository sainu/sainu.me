import { FC } from "react"

type Props = {}

export const Timeline: FC<Props> = ({
  children,
}) => {
  return (
    <div className='flex flex-col divide-y'>
      {children}
    </div>
  )
}
