import { FC } from "react";

export const SocialIconLinkList: FC = ({ children }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {children}
    </div>
  )
}
