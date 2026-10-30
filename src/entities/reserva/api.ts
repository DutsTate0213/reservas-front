import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Reserva, ReservaPayload } from '@/entities/reserva/model'

export const reservaApi = createCrudApi<Reserva, ReservaPayload>('reserva')
