import axios from "axios";

export const profileApiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 3 * 60 * 1000,
  headers: {
    'User-Agent': 'profile-front'
  },
  auth: {
    username: process.env.BASIC_AUTH_USERNAME || 'local',
    password: process.env.BASIC_AUTH_PASSWORD || 'secret',
  },
})

export const qiitaClient = axios.create({
  baseURL: 'https://qiita.com',
  timeout: 3 * 60 * 1000,
  headers: {
    'User-Agent': 'sainu.me'
  },
})
