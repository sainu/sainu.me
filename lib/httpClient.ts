import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 3 * 60 * 1000,
  headers: {
    'User-Agent': 'profile-front'
  }
})
