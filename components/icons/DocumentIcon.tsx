import { FC } from "react"

type Props = {
  width?: number
  height?: number
  fill?: boolean
  fillColor?: string
}

export const DocumentIcon: FC<Props> = ({
  width = 24,
  height = 24,
  fill = false,
  fillColor = 'currentColor',
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fillColor} viewBox="0 0 16 16">
      {fill ?
        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"/>
      :
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
      }
    </svg>
  )
}
