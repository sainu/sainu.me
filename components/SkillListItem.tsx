import { FC } from "react"
import { Skill } from "type/api/skill"

type Props = {
  skill: Skill
}

export const SkillListItem: FC<Props> = ({ skill }) => {
  const colors = [
    ['bg-blue-50', 'text-gray-900'],
    ['bg-blue-100', 'text-gray-900'],
    ['bg-blue-200', 'text-gray-900'],
    ['bg-blue-300', 'text-gray-900'],
    ['bg-blue-400', 'text-white'],
    ['bg-blue-500', 'text-white'],
    ['bg-blue-600', 'text-white'],
    ['bg-blue-700', 'text-white'],
    ['bg-blue-800', 'text-white'],
    ['bg-blue-900', 'text-white'],
  ]
  const colorsSize = colors.length

  const level = Math.floor(skill.score / colorsSize)

  return (
    <div className="bg-gray-100 rounded-full">
      <div style={{ width: `${skill.score}%` }}>
        <div className={`animate-left-to-right flex items-center justify-start h-6 px-4 rounded-full ${colors[level][0]}`}>
          <span className={`${colors[level][1]} text-sm`}>
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  )
}
