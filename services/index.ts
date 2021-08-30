import { profileApiClient } from "lib/httpClient"
import { Experience, Project, Technology } from "type/api/experience"
import { Post, PostMdMeta } from "type/api/post"
import { Profile } from "type/api/profile"
import { Skill } from "type/api/skill"
import { SocialLink } from "type/api/socialLink"
import { WebLink } from "type/api/webLink"
import path from 'path'
import fs from 'fs'
import * as md from 'lib/markdown'
import { DEFAULT_PER_PAGE, getTotalPages, paging } from "lib/pagination"

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
  const res = await profileApiClient.get('/api/profile')
  return mapProfile(res.data)
}

const mapProfile = (data: any): Profile => {
  return {
    familyNameKanji: data['family_name_kanji'],
    givenNameKanji: data['given_name_kanji'],
    familyNameKana: data['family_name_kana'],
    givenNameKana: data['given_name_kana'],
    familyNameEn: data['family_name_en'],
    givenNameEn: data['given_name_en'],
    fullNameKanji: data['full_name_kanji'],
    fullNameKana: data['full_name_kana'],
    fullNameEn: data['full_name_en'],
    nickname: data['nickname'],
    job: data['job'],
    email: data['email'],
    bio: data['bio'],
    location: data['location'],
  }
}

export const fetchSkills = async (): Promise<Skill[]> => {
  const res = await profileApiClient.get<any[]>('/api/skills')
  return res.data.map(mapSkill).sort((a, b) => b.score - a.score)
}

const mapSkill = (data: any): Skill => {
  return {
    name: data['name'],
    score: data['score'],
  }
}

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const res = await profileApiClient.get('/api/social_links')
  return res.data.map(mapSocialLink)
}

const mapSocialLink = (data: any): SocialLink => {
  return {
    name: data['name'],
    url: data['url'],
  }
}

export const fetchWebLinks = async(): Promise<WebLink[]> => {
  const res = await profileApiClient.get('/api/web_links')
  return res.data.map(mapWebLink)
}

const mapWebLink = (data: any): WebLink => {
  return {
    name: data['name'],
    url: data['url'],
  }
}

export const fetchExperiences = async(): Promise<Experience[]> => {
  const res = await profileApiClient.get('/api/experiences')
  return res.data.map(mapExperience)
}

const mapExperience = (data: any): Experience => {
  return {
    companyName: data['company_name'],
    employmentType: data['employment_type'],
    department: data['department'],
    startDate: data['start_date'],
    endDate: data['end_date'] === '0001-01-01T00:00:00Z' ? null : data['end_date'],
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
    name: data['name'],
    versions: data['versions'],
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
