import Link from "next/link";
import { FC } from "react";
import { EnvelopeIcon } from "./icons/EnvelopeIcon";

type Props = {
  email: string
}

export const EmailWithLink: FC<Props> = ({
  email,
}) => {
  return (
    <Link href={`mailto:${email}`}>
      <a className="px-4 rounded-full flex flex-row items-center gap-1 hover:shadow-md">
        <EnvelopeIcon width={16} height={16} />
        {email}
      </a>
    </Link>
  )
}
