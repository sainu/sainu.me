import { FC } from "react"
import { GithubIcon } from "components/icons/GitHubIcon"
import { TwitterIcon } from "components/icons/TwitterIcon"
import { FacebookIcon } from "components/icons/FacebookIcon"
import { WantedlyIcon } from "./icons/WantedlyIcon"
import { QiitaIcon } from "./icons/QiitaIcon"
import { EnvelopeIcon } from "./icons/EnvelopeIcon"
import { HomeIcon } from "./icons/HomeIcon"
import { BookIcon } from "./icons/BookIcon"
import { LightningChargeIcon } from "./icons/LightningChargeIcon"
import { PersonIcon } from "./icons/PersonIcon"
import { DocumentIcon } from "./icons/DocumentIcon"
import { ChevronBarLeftIcon } from "./icons/ChevronBarLeft"
import { ChevronBarRightIcon } from "./icons/ChevronBarRight"

const icons = {
  'book': BookIcon,
  'chevron-bar-left': ChevronBarLeftIcon,
  'chevron-bar-right': ChevronBarRightIcon,
  'document': DocumentIcon,
  'envelope': EnvelopeIcon,
  'facebook': FacebookIcon,
  'github': GithubIcon,
  'home': HomeIcon,
  'lightning-charge': LightningChargeIcon,
  'person': PersonIcon,
  'qiita': QiitaIcon,
  'twitter': TwitterIcon,
  'wantedly': WantedlyIcon,
} as const
const iconNames = Object.keys(icons) as Array<keyof typeof icons>
type iconNames = (typeof iconNames)[number]

export type IconProps = {
  width?: number
  height?: number
  fill?: boolean
}

type Props = {
  name: iconNames
} & IconProps

export const Icon: FC<Props> = (props) => {
  const { name } = props
  const iconProps: IconProps = {
    width: props.width || props.height,
    height: props.height || props.width,
    fill: props.fill,
  }

  if (name in icons) {
    const TheIcon = icons[name]
    return <TheIcon {...iconProps} />
  } else {
    return <></>
  }
}
