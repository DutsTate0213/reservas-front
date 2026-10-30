import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Horario, HorarioPayload } from '@/entities/horario/model'

export const horarioApi = createCrudApi<Horario, HorarioPayload>('horario')
