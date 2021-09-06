import { FC } from "react"
import Link from 'next/link'
import { SocialLink } from "type/api/socialLink"
import { Icon } from "./Icon"

type Props = {
  socialLink: SocialLink
}

const socialIconMap = {
  "GitHub": "github",
  "Twitter": "twitter",
  "Facebook": "facebook",
  "Wantedly": "wantedly",
  "Qiita": "qiita",
} as const

export const SocialIconLink: FC<Props> = ({
  socialLink,
}) => {
  return (
    <Link href={socialLink.url}>
      <a target='_blank' className="flex items-center rounded-full hover:shadow-md">
        <Icon name={socialIconMap[socialLink.name]} width={32} height={32} />
      </a>
    </Link>
  )
}
