import { FC } from "react"

export const SkillList: FC = ({ children }) => {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  )
}
