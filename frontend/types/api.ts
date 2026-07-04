// Responses returned by the FastAPI backend (see api/_core/routes).

export interface JwtResponse {
  accessToken: string
  jwt: string
  expiration: string
}

export interface EatResponse {
  access_token: string
  account_name: string
}

export interface GuestResponse {
  access_token: string
  open_id: string
}

export interface BioUpdateResponse {
  success: boolean
  message: string
}

export interface BioResponse {
  id: number
  text: string
  category: string
}

export interface ApiError {
  detail: string
}
