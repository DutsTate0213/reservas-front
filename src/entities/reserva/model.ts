export interface Reserva {
  id: number
  descricaoAtividade: string | null
  dataReserva: string
  dataCadastro: string
  usuario: { id: number; nome: string }
  reservaStatus: { id: number; nome: string }
  reservaTipo: { id: number; nome: string }
  horario: { id: number; descricao: string }
  sala: { id: number; nome: string }
  disciplina: { id: number; nome: string } | null
  curso: { id: number; nome: string } | null
}

export interface ReservaPayload {
  descricaoAtividade?: string
  dataReserva: string
  usuarioId: number
  reservaStatusId: number
  reservaTipoId: number
  horarioId: number
  salaId: number
  disciplinaId?: number | null
  cursoId?: number | null
}
