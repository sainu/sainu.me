import { FC } from "react"

export const PostList: FC = ({ children }) => {
  return (
    <section className='flex flex-col gap-4'>
      {children}
    </section>
  )
}
