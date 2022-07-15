import axios from "axios";

export const profileApiClient = axios.create({
  baseURL: process.env.PROFILE_API_BASE_URL,
  timeout: 3 * 60 * 1000,
  headers: {
    'User-Agent': 'sainu.me',
    'X-MICROCMS-API-KEY': process.env.PROFILE_API_API_KEY || '',
  },
})

export const qiitaClient = axios.create({
  baseURL: 'https://qiita.com',
  timeout: 3 * 60 * 1000,
  headers: {
    'User-Agent': 'sainu.me'
  },
})
