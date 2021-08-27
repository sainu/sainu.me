import { FC } from "react";
import Image from "next/image"

type Props = {
  width: number
  height: number
}

export const QiitaIcon: FC<Props> = ({
  width,
  height,
}) => {
  return (
    <Image
      width={width}
      height={height}
      alt='qiita.com logo'
      src="/images/qiitaFavicon.png" />
  )
}
