import { SimpleEntityCrud } from '@/widgets/simple-entity-crud/SimpleEntityCrud'
import { edificioApi } from '@/entities/edificio'

export function EdificioPage() {
  return <SimpleEntityCrud title="Edificios" api={edificioApi} />
}
