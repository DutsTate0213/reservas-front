import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Usuario, UsuarioPayload } from '@/entities/usuario/model'

export const usuarioApi = createCrudApi<Usuario, UsuarioPayload>('usuario')
