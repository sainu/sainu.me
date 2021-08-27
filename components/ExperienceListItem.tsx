import { formatExperienceDate } from "lib/date";
import { FC } from "react";
import { Experience } from "type/api/experience";

type Props = {
  experience: Experience
}

export const ExperienceListItem: FC<Props> = ({ experience }) => {
  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row sm:gap-2 sm:items-center pb-1.5">
        <div className="font-bold">
          {experience.companyName}
        </div>
        <div className="text-gray-400 text-sm">
          <span>
            {experience.employmentType}
          </span>
          ・
          <span className="ml-1">
            {formatExperienceDate(experience.startDate)}
            〜
            {experience.endDate ? formatExperienceDate(experience.endDate) : ''}
          </span>
        </div>
      </div>

      {experience.projects.length > 0 ?
        <ul className="list-disc pl-7">
          {experience.projects.map((project, i) => (
            <li key={i} className="pb-1">
              {project.description}
              {project.technologies.length > 0 ?
                <div className="flex items-start flex-wrap">
                  {project.technologies.map((technology, j) => (
                    <span key={j} className="inline-block text-gray-500 rounded-lg text-xs mr-2">
                      #{technology.name}
                    </span>
                  ))}
                </div>
              : ''}
            </li>
          ))}
        </ul>
      : ''}
    </div>
  )
}
