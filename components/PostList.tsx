import { FC } from "react"

type Props = {
  gapClass?: string
}

export const PostList: FC<Props> = ({
  gapClass = 'gap-1',
  children,
}) => {
  return (
    <div className={`flex flex-col ${gapClass}`}>
      {children}
    </div>
  )
}
