export interface TokenResponse {
  accessToken: string
  jwt: string
  uid: string
  expiration: string
}

export interface BioResponse {
  id: number
  text: string
  category: string
}

export interface ApiError {
  detail: string
}