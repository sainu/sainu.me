import { FC } from "react"
import Link from 'next/link'
import { SocialLink } from "type/api/socialLink"
import { GithubIcon } from "components/icons/GitHubIcon"
import { TwitterIcon } from "components/icons/TwitterIcon"
import { FacebookIcon } from "components/icons/FacebookIcon"
import { WantedlyIcon } from "./icons/WantedlyIcon"
import { QiitaIcon } from "./icons/QiitaIcon"

type Props = {
  socialLink: SocialLink
}

const iconSize = 32

const getIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return <GithubIcon width={iconSize} height={iconSize} />
    case "Twitter":
      return <TwitterIcon width={iconSize} height={iconSize} />
    case "Facebook":
      return <FacebookIcon width={iconSize} height={iconSize} />
    case "Wantedly":
      return <WantedlyIcon width={iconSize} height={iconSize} />
    case "Qiita":
      return <QiitaIcon width={iconSize} height={iconSize} />
    default:
      return
    }
}

export const SocialIconLink: FC<Props> = ({
  socialLink,
}) => {
  const icon = getIcon(socialLink.name)
  return (
    <>
      {icon ?
        <Link href={socialLink.url}>
          <a target='_blank' className="flex items-center rounded-full hover:shadow-md">
            {icon}
          </a>
        </Link>
      : undefined}
    </>
  )
}
