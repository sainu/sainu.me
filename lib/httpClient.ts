import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 3 * 60 * 1000,
  headers: {
    'User-Agent': 'profile-front'
  }
})
