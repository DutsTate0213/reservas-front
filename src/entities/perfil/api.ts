import { createCrudApi } from '@/shared/api/createCrudApi'
import type { Perfil, PerfilPayload } from '@/entities/perfil/model'

export const perfilApi = createCrudApi<Perfil, PerfilPayload>('perfil')
