import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Curso, CursoPayload } from '@/entities/curso/model'

export const cursoApi = createCrudApi<Curso, CursoPayload>('curso')
