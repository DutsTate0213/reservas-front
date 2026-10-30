import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Disciplina, DisciplinaPayload } from '@/entities/disciplina/model'

export const disciplinaApi = createCrudApi<Disciplina, DisciplinaPayload>('disciplina')
