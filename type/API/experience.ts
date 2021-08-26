export type Experience = {
  companyName: string,
  employmentType: string,
  department: string | null,
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
