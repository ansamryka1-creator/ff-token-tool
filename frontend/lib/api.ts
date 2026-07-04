import axios from 'axios'
import type {
  JwtResponse,
  EatResponse,
  GuestResponse,
  BioUpdateResponse,
  BioResponse,
} from '@/types/api'

// Same-origin by default: on Vercel the FastAPI functions live under /api on
// the same domain. NEXT_PUBLIC_API_URL can override this for split deployments.
const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  token: {
    // Access Token -> JWT
    extractJwt: (accessToken: string) =>
      apiClient.post<JwtResponse>('/api/token', { access_token: accessToken }),
    // EAT token (or URL) -> Access Token
    eatToAccess: (eatToken: string) =>
      apiClient.post<EatResponse>('/api/eat-to-access', { eat_token: eatToken }),
    // Guest account (UID + password) -> Access Token
    guestToken: (uid: string, password: string) =>
      apiClient.post<GuestResponse>('/api/guest-token', { uid, password }),
  },
  bio: {
    // Push a bio to the Free Fire account using a JWT
    update: (jwtToken: string, bioText: string) =>
      apiClient.post<BioUpdateResponse>('/api/update-bio', {
        jwt_token: jwtToken,
        bio_text: bioText,
      }),
    getLibrary: () => apiClient.get<BioResponse[]>('/api/library'),
  },
}

// Normalize a backend/axios error into a human-readable message.
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (error.message) return error.message
  }
  if (error instanceof Error) return error.message
  return 'Unexpected error'
}
