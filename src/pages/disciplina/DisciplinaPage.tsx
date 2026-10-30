import { SimpleEntityCrud } from '@/widgets/simple-entity-crud/SimpleEntityCrud'
import { disciplinaApi } from '@/entities/disciplina'

export function DisciplinaPage() {
  return <SimpleEntityCrud title="Disciplinas" api={disciplinaApi} />
}
