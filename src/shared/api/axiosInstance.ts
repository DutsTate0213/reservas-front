import axios from 'axios'
import { API_BASE_URL } from '@/shared/config/env'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    return data?.message ?? error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Erro inesperado'
}
