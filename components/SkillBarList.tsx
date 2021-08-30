import { FC } from "react"

export const SkillBarList: FC = ({ children }) => {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  )
}
