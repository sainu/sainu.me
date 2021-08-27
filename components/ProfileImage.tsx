import { FC } from "react"
import Image from 'next/image'

type Props = {
  width: number
  height: number
}

export const ProfileImage: FC<Props> = ({
  width,
  height,
}) => {
  return (
    <Image
      className="rounded-full"
      src={'/images/profileImage.jpg'}
      alt='プロフィール画像'
      width={width}
      height={height} />
  )
}
