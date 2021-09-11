export type Experience = {
  companyName: string,
  employmentType: "正社員" | "パートタイム" | "フリーランス" | "インターン",
  startDate: string,
  endDate: string | null,
  projects: Project[]
}

export type Project = {
  description: string,
  technologies: Technology[]
}

export type Technology = {
  name: string,
  versions: string[] | null
}
