export interface Horario {
  id: number
  descricao: string
  horarioInicio: string
  horarioFim: string
}

export interface HorarioPayload {
  descricao: string
  horarioInicio: string
  horarioFim: string
}
