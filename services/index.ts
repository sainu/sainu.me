import { apiClient } from "lib/httpClient"
import { Profile } from "type/API/profile"

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
