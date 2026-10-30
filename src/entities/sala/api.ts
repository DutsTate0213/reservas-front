import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Sala, SalaPayload } from '@/entities/sala/model'

export const salaApi = createCrudApi<Sala, SalaPayload>('sala')
