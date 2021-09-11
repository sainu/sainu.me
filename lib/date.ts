import dayjs from "dayjs"

export const formatExperienceDate = (date: string): string => {
  return dayjs(date).format('YYYY年M月')
}

export const formatMetaPublishedTime = (date: Date): string => {
  return dayjs(date).toISOString()
}

export const formatISO = (date: string): string => {
  return dayjs(date).toISOString()
}

export const formatPostPublishedTime = (date: string): string => {
  return dayjs(date).format('YYYY/MM/DD')
}

export const formatQiitaPostTime = (date: string): string => {
  return dayjs(date).format('YYYY年MM月DD日')
}

export const getYear = (date: string): number => {
  return dayjs(date).year()
}

export const getMonth = (date: string): number => {
  return dayjs(date).month() + 1
}

export const getDate = (date: string): number => {
  return dayjs(date).date()
}
