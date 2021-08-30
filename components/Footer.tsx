import { FC } from "react"

type Props = {
  copyRight: string,
}

export const Footer: FC<Props> = ({
  copyRight,
}) => {
  return (
    <footer className="py-4 text-center text-sm text-gray-400 mt-6">
      &copy; 2021 {copyRight}
    </footer>
  )
}
