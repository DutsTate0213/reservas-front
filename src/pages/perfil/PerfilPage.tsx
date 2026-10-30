import { SimpleEntityCrud } from '@/widgets/simple-entity-crud/SimpleEntityCrud'
import { perfilApi } from '@/entities/perfil'

export function PerfilPage() {
  return <SimpleEntityCrud title="Perfis" api={perfilApi} />
}
