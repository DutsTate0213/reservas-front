import { SimpleEntityCrud } from '@/widgets/simple-entity-crud/SimpleEntityCrud'
import { cursoApi } from '@/entities/curso'

export function CursoPage() {
  return <SimpleEntityCrud title="Cursos" api={cursoApi} />
}
