import { FC } from "react";
import Image from "next/image"
import { IconProps } from "components/Icon";

export const QiitaIcon: FC<IconProps> = ({
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
