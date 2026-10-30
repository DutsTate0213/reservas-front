export interface Sala {
  id: number
  nome: string
  capacidade: number
  edificio: { id: number; nome: string }
  salaTipo: { id: number; nome: string }
}

export interface SalaPayload {
  nome: string
  capacidade: number
  edificioId: number
  salaTipoId: number
}
