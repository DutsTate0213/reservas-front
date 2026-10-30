export interface LookupOption {
  id: number
  nome: string
}

/**
 * reserva_status, reserva_tipo e sala_tipo nao possuem controller/endpoint
 * CRUD no back-end (sao tabelas de referencia fixas, populadas via seed SQL).
 * Os valores abaixo refletem exatamente init/2-insert.sql.
 */
export const RESERVA_STATUS_OPTIONS: LookupOption[] = [
  { id: 1, nome: 'Pendente' },
  { id: 2, nome: 'Confirmada' },
  { id: 3, nome: 'Cancelada' },
  { id: 4, nome: 'Rejeitada' },
]

export const RESERVA_TIPO_OPTIONS: LookupOption[] = [
  { id: 1, nome: 'Aula' },
  { id: 2, nome: 'Evento' },
  { id: 3, nome: 'Reuniao' },
  { id: 4, nome: 'Manutencao' },
]

export const SALA_TIPO_OPTIONS: LookupOption[] = [
  { id: 1, nome: 'Sala de Aula' },
  { id: 2, nome: 'Laboratorio' },
  { id: 3, nome: 'Auditorio' },
]
