export interface Usuario {
  id: number
  nome: string
  email: string
  telefone: string | null
  ativo: boolean
  senha: string
}

export interface UsuarioPayload {
  nome: string
  email: string
  telefone?: string
  senha: string
  ativo: boolean
}
