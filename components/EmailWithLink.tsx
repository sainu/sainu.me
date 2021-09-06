import Link from "next/link";
import { FC } from "react";
import { Icon } from "./Icon";

type Props = {
  email: string
}

export const EmailWithLink: FC<Props> = ({
  email,
}) => {
  return (
    <Link href={`mailto:${email}`}>
      <a className="sm:px-4 sm:rounded-full flex items-center gap-1 sm:hover:shadow-md hover:underline sm:hover:no-underline">
        <Icon name='envelope' width={16} height={16} />
        {email}
      </a>
    </Link>
  )
}
