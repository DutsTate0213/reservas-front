import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Edificio, EdificioPayload } from '@/entities/edificio/model'

export const edificioApi = createCrudApi<Edificio, EdificioPayload>('edificio')
