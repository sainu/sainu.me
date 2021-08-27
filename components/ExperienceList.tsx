import { FC } from "react";

export const ExperienceList: FC = ({ children }) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-6">
      {children}
    </div>
  )
}
