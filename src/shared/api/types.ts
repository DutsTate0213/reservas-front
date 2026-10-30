export interface ApiPageMetadata {
  number: number
  size: number
  totalElements: number
  totalPages: number
}

export interface ApiResponse<T> {
  data: T
  page?: ApiPageMetadata
}
