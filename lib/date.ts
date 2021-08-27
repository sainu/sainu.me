import dayjs from "dayjs"

export const formatExperienceDate = (date: string): string => {
  return dayjs(date).format('YYYY年M月')
}

export const formatMetaPublishedTime = (date: Date): string => {
  return dayjs(date).toISOString()
}
