import { FC } from "react";

export const PageTitle: FC = ({ children }) => {
  return (
    <div className="text-3xl font-bold mb-12">
      {children}
    </div>
  )
}
