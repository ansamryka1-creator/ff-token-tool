import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  token: {
    generate: (platform: string, url: string) =>
      apiClient.post('/api/token', { platform, url }),
  },
  bio: {
    process: (content: string) =>
      apiClient.post('/api/longbio', { content }),
    getLibrary: () =>
      apiClient.get('/api/bios'),
  },
}