import { apiClient } from "lib/httpClient"
import { Profile } from "type/API/profile"
import { Skill } from "type/API/skill"
import { SocialLink } from "type/API/socialLink"
import { WebLink } from "type/API/webLink"

export const fetchProfile = async (): Promise<Profile> => {
  const res = await apiClient.get('/api/profile')
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
    nickname: data['nickname'],
    job: data['job'],
    email: data['email'],
    bio: data['bio'],
    location: data['location'],
  }
}

export const fetchSkills = async (): Promise<Skill[]> => {
  const res = await apiClient.get('/api/skills')
  return res.data.map(mapSkill)
}

const mapSkill = (data: any): Skill => {
  return {
    name: data['name'],
    score: data['score'],
  }
}

export const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const res = await apiClient.get('/api/social_links')
  return res.data.map(mapSocialLink)
}

const mapSocialLink = (data: any): SocialLink => {
  return {
    name: data['name'],
    url: data['url'],
  }
}

export const fetchWebLinks = async(): Promise<WebLink[]> => {
  const res = await apiClient.get('/api/web_links')
  return res.data.map(mapWebLink)
}

const mapWebLink = (data: any): WebLink => {
  return {
    name: data['name'],
    url: data['url'],
  }
}
