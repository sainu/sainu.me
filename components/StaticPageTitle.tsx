import { FC } from "react";

export const StaticPageTitle: FC = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold">
      {children}
    </h1>
  )
}
