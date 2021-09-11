import { getDate, getMonth, getYear } from "lib/date"
import { FC } from "react"
import { TimelineData } from "type/api/timeline"

const yearBgColors = [
  'bg-yellow-400',
  'bg-red-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-purple-400',
  'bg-pink-400',
]

function getTitle(d: TimelineData): React.ReactNode {
  if (d.type === "lifeEvent") return d.data.title

  let labelName: string
  if (d.data.employmentType === "正社員")
    labelName = d.start ? '入社' : '退職'
  else
    labelName = d.start ? '開始' : '終了'
  return (
    <>
      <span className='text-xs text-blue-700 border-b border-blue-700 border-dashed pb-0.5 mr-2'>
        {labelName}
      </span>
      {d.data.companyName}
      <span className='text-xs font-bold bg-gray-200 text-gray-500 px-2 py-0.5 rounded ml-2'>
        {d.data.employmentType}
      </span>
    </>
  )
}

type Props = {
  timelineData: TimelineData
}

export const TimelineItem: FC<Props> = ({
  timelineData
}) => {
  const year = getYear(timelineData.date)
  const yearBgColor = yearBgColors[year % yearBgColors.length]

  return (
    <div className='flex py-4'>
      <div className='flex flex-col w-18 shadow px-3 py-2 rounded'>
        <div className={`text-xs ${yearBgColor} text-white rounded-full inline text-center w-12 mb-1.5`}>
          {getYear(timelineData.date)}
        </div>
        <div className='flex justify-center font-bold leading-none'>
          {getMonth(timelineData.date)}
          .
          {getDate(timelineData.date)}
        </div>
      </div>

      <div className='px-3 flex items-center'>
        {getTitle(timelineData)}
      </div>
    </div>
  )
}
