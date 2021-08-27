import { FC } from "react"

export const ArticleLayout: FC = ({ children }) => {
  return (
    <main className="max-w-screen-md mx-auto my-0 pt-8 px-4">
      {children}
    </main>
  )
}
