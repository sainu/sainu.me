import { profileApiClient, qiitaClient } from "lib/httpClient"
import { Experience, Project, Technology } from "type/api/experience"
import { Post, PostMdMeta } from "type/api/post"
import { Profile } from "type/api/profile"
import { Skill } from "type/api/skill"
import { SocialLink } from "type/api/socialLink"
import path from 'path'
import fs from 'fs'
import * as md from 'lib/markdown'
import { DEFAULT_PER_PAGE, getTotalPages, paging } from "lib/pagination"
import { parseStringPromise } from 'xml2js'
import { QiitaPost } from "type/api/qiitaPost"
import { LifeEvent } from "type/api/lifeEvent"
import { TimelineData } from "type/api/timeline"

type IndexParams = {
  page?: number
  perPage?: number
}

type IndexResponse<T> = {
  data: T[]
  meta: {
    totalCount: number
    totalPages: number
    perPage: number
  }
}

export const fetchProfile = async (): Promise<Profile> => {
  const res = await profileApiClient.get('/api/v1/profile')
  return mapProfile(res.data)
}

const mapProfile = (data: any): Profile => {
  return {
    familyNameKanji: data['familyNameKanji'],
    givenNameKanji: data['givenNameKanji'],
    familyNameKana: data['familyNameKana'],
    givenNameKana: data['givenNameKana'],
    familyNameEn: data['familyNameEn'],
    givenNameEn: data['givenNameEn'],
    nickname: data['nickname'],
    job: data['job'],
    email: data['email'],
    bio: data['bio'],
    location: data['location'],
    profileImageUrl: data['profileImage']['url'],
  }
}

export const fetchSkills = async (params?: { orders: '-score' }): Promise<Skill[]> => {
  const res = await profileApiClient.get('/api/v1/skills', { params: params })
  return res.data.contents.map(mapSkill)
}

const mapSkill = (data: any): Skill => {
  return {
    name: data['name'],
    score: data['score'],
  }
}

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const res = await profileApiClient.get('/api/v1/social_links')
  return res.data.contents.map(mapSocialLink)
}

const mapSocialLink = (data: any): SocialLink => {
  return {
    name: data['name'],
    url: data['url'],
  }
}

export const fetchExperiences = async(params?: { orders: '-startDate' }): Promise<Experience[]> => {
  const res = await profileApiClient.get('/api/v1/experiences', { params })
  return res.data.contents.map(mapExperience)
}

const mapExperience = (data: any): Experience => {
  return {
    companyName: data['companyName'],
    employmentType: data['employmentTypes'][0],
    startDate: data['startDate'],
    endDate: data['endDate'] ? data['endDate'] : null,
    projects: data.projects.map(mapProject),
  }
}

const mapProject = (data: any): Project => {
  return {
    description: data['description'],
    technologies: data.technologies.map(mapTechnology),
  }
}

const mapTechnology = (data: any): Technology => {
  return {
    name: data['technology']['name'],
    versions: data['versions'] ? [data['versions']] : null,
  }
}

export const fetchPosts = async(params?: IndexParams): Promise<IndexResponse<Post>> => {
  const { page = 1, perPage = DEFAULT_PER_PAGE } = (params || {})

  const fileNames = fs.readdirSync(path.join(process.cwd(), './contents/posts'))
  const sortedFileNames = fileNames.reverse()
  const fileNamesInPage = paging(sortedFileNames, page, perPage)

  const promises = fileNamesInPage.map(async (fileName) => {
    const filepath = path.join(process.cwd(), `./contents/posts/${fileName}`)
    const slug = path.basename(filepath, path.extname(filepath))
    const parseResult = await md.parseFile<PostMdMeta>(filepath)
    return mapPost(slug, parseResult)
  })

  return {
    data: await Promise.all(promises),
    meta: {
      totalCount: fileNames.length,
      totalPages: getTotalPages(fileNames.length, perPage),
      perPage: perPage,
    }
  }
}

export const fetchPost = async(slug: string): Promise<Post> => {
  const filepath = path.join(process.cwd(), `./contents/posts/${slug}.md`)
  const parseResult = await md.parseFile<PostMdMeta>(filepath)
  return mapPost(slug, parseResult)
}

const mapPost = (slug: string, data: md.MarkdownParseResult<PostMdMeta>): Post => {
  return {
    slug: slug,
    title: data.meta.title,
    publishedAt: data.meta.published_at,
    content: data.content,
  }
}

export const fetchQiitaPosts = async(): Promise<QiitaPost[]> => {
  const res = await qiitaClient.get('/sainu/feed')
  const json = await parseStringPromise(res.data)
  return json.feed.entry.map(mapQiitaPost)
}

const mapQiitaPost = (data: any): QiitaPost => {
  return {
    id: data['id'][0],
    published: data['published'][0],
    updated: data['updated'][0],
    url: data['url'][0],
    title: data['title'][0],
  }
}

export const fetchLifeEvents = async(): Promise<LifeEvent[]> => {
  const res = await profileApiClient.get("/api/v1/life_events")
  return res.data.contents.map(mapLifeEvent)
}

const mapLifeEvent = (data: any): LifeEvent => {
  return {
    title: data['title'],
    date: data['date'],
  }
}

export const fetchTimeline = async(): Promise<TimelineData[]> => {
  const [
    lifeEvents,
    experiences,
  ] = await Promise.all([
    fetchLifeEvents(),
    fetchExperiences({ orders: '-startDate' }),
  ])

  return [
    ...lifeEvents.map(
      (e): TimelineData => ({ type: "lifeEvent", data: e, date: e.date })
    ),
    ...experiences.map(
      (e): TimelineData => ({ type: "experience", data: e, date: e.startDate, start: true })
    ),
    ...experiences.reduce<TimelineData[]>(
      (acc, e) => {
        if (!e.endDate) return [...acc]
        return [...acc, { type: "experience", data: e, date: e.endDate, start: false }]
      },
      []
    ),
  ].sort((a, b) => b.date.localeCompare(a.date))
}
