import { FC } from "react";
import { Skill } from "type/api/skill";

type Props = {
  rank: number,
  skill: Skill,
}

const textSizes = [
  'text-xl',
  'text-lg',
  'text-base,'
]

const bgColors = [
  'bg-yellow-200',
  'bg-gray-200',
  'bg-yellow-600',
]

const textColors = [
  'text-yellow-500',
  'text-gray-500',
  'text-yellow-900',
]

const borderColors = [
  'border-yellow-300',
  'border-gray-300',
  'border-yellow-600',
]

export const SkillRankListItem: FC<Props> = ({
  rank,
  skill,
}) => {
  const index = rank - 1

  return (
    <div className={`flex items-center gap-2 ${textSizes[index]}`}>
      <div className='text-center'>
        <div className={`w-8 h-8 flex items-center justify-center rounded-md border ${bgColors[index]} ${textColors[index]} ${borderColors[index]}`}>
          {rank}
        </div>
      </div>
      <div>
        {skill.name}
      </div>
    </div>
  )
}
