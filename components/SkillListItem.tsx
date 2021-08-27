import { FC } from "react"
import { Skill } from "type/api/skill"

type Props = {
  skill: Skill
}

const colors = [
  [50, 'text-gray-900'],
  [100, 'text-gray-900'],
  [200, 'text-gray-900'],
  [300, 'text-gray-900'],
  [400, 'text-white'],
  [500, 'text-white'],
  [600, 'text-white'],
  [700, 'text-white'],
  [800, 'text-white'],
  [900, 'text-white'],
]
const colorsSize = colors.length

export const SkillListItem: FC<Props> = ({ skill }) => {
  const level = Math.floor(skill.score / colorsSize)

  return (
    <div className="bg-gray-100 rounded-full">
      <div style={{ width: `${skill.score}%` }}>
        <div className={`animate-left-to-right flex items-center justify-start h-6 px-4 rounded-full bg-blue-${colors[level][0]}`}>
          <span className={`${colors[level][1]} text-sm`}>
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  )
}
