import { FC } from "react"

type Props = {
  copyRight: string,
}

const Footer: FC<Props> = ({
  copyRight,
}) => {
  return (
    <footer className="py-4 text-center text-sm text-gray-400">
      &copy; 2021 {copyRight}
    </footer>
  )
}
export default Footer
