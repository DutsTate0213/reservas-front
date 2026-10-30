import { useEffect, useState, type FormEvent } from 'react'
import type { CrudApi } from '@/shared/api/createCrudApi'
import { extractErrorMessage } from '@/shared/api/axiosInstance'
import { Field } from '@/shared/ui/Field'
import { Button } from '@/shared/ui/Button'
import { Banner } from '@/shared/ui/Banner'

interface NamedEntity {
  id: number
  nome: string
}

interface SimpleEntityCrudProps {
  title: string
  api: CrudApi<NamedEntity, { nome: string }>
}

export function SimpleEntityCrud({ title, api }: SimpleEntityCrudProps) {
  const [items, setItems] = useState<NamedEntity[]>([])
  const [nome, setNome] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadItems() {
    setLoading(true)
    setError(null)
    try {
      const data = await api.list()
      setItems(data)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  function startEdit(item: NamedEntity) {
    setEditingId(item.id)
    setNome(item.nome)
  }

  function cancelEdit() {
    setEditingId(null)
    setNome('')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      if (editingId !== null) {
        await api.update(editingId, { nome })
      } else {
        await api.create({ nome })
      }
      cancelEdit()
      await loadItems()
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Confirma a exclusao deste registro?')) return
    setError(null)
    try {
      await api.remove(id)
      await loadItems()
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <section>
      <h1>{title}</h1>

      {error ? <Banner kind="error" message={error} /> : null}

      <form className="crud-form" onSubmit={handleSubmit}>
        <Field label="Nome" htmlFor="nome" required>
          <input
            id="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </Field>
        <div className="crud-form-actions">
          <Button type="submit" disabled={submitting}>
            {editingId !== null ? 'Salvar' : 'Adicionar'}
          </Button>
          {editingId !== null ? (
            <Button type="button" variant="secondary" onClick={cancelEdit}>
              Cancelar
            </Button>
          ) : null}
        </div>
      </form>

      <div className="crud-table-wrapper">
        {loading ? (
          <p className="crud-empty">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="crud-empty">Nenhum registro encontrado.</p>
        ) : (
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>
                    <div className="crud-table-actions">
                      <Button variant="secondary" onClick={() => startEdit(item)}>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(item.id)}>
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
