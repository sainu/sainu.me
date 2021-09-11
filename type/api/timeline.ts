import { Experience } from "./experience"
import { LifeEvent } from "./lifeEvent"

export type TimelineData = { date: string } & (LifeEventData | ExperienceData)

type LifeEventData = {
  type: "lifeEvent"
  data: LifeEvent
}

type ExperienceData = {
  type: "experience"
  data: Experience
  start: boolean
}
