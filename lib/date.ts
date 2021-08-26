import dayjs from "dayjs"

export const formatExperienceDate = (date: string): string => {
  return dayjs(date).format('YYYY年M月')
}
