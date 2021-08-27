import { FC } from "react";

export const SectionHeading: FC = ({ children }) => {
  return (
    <h2 className="text-xl mb-8 mt-10 font-bold">
      {children}
    </h2>
  )
}
