import { FC } from "react";

export const SectionTitle: FC = ({ children }) => {
  return (
    <div className="text-xl mb-8 font-bold">
      {children}
    </div>
  )
}
