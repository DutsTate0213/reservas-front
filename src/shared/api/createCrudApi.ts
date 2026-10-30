import { apiClient } from '@/shared/api/axiosInstance'
import type { ApiResponse } from '@/shared/api/types'

export interface CrudApi<TEntity, TPayload> {
  list: () => Promise<TEntity[]>
  getById: (id: number) => Promise<TEntity>
  create: (payload: TPayload) => Promise<TEntity>
  update: (id: number, payload: TPayload) => Promise<TEntity>
  remove: (id: number) => Promise<void>
}

export function createCrudApi<TEntity, TPayload>(resource: string): CrudApi<TEntity, TPayload> {
  const basePath = `/${resource}`

  return {
    async list() {
      const { data } = await apiClient.get<ApiResponse<TEntity[]>>(basePath)
      return data.data
    },
    async getById(id) {
      const { data } = await apiClient.get<ApiResponse<TEntity>>(`${basePath}/${id}`)
      return data.data
    },
    async create(payload) {
      const { data } = await apiClient.post<ApiResponse<TEntity>>(basePath, payload)
      return data.data
    },
    async update(id, payload) {
      const { data } = await apiClient.put<ApiResponse<TEntity>>(`${basePath}/${id}`, payload)
      return data.data
    },
    async remove(id) {
      await apiClient.delete(`${basePath}/${id}`)
    },
  }
}
