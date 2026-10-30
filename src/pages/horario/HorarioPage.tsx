import { useEffect, useState, type FormEvent } from 'react'
import { horarioApi } from '@/entities/horario'
import type { Horario } from '@/entities/horario'
import { extractErrorMessage } from '@/shared/api/axiosInstance'
import { Field } from '@/shared/ui/Field'
import { Button } from '@/shared/ui/Button'
import { Banner } from '@/shared/ui/Banner'

const EMPTY_FORM = { descricao: '', horarioInicio: '', horarioFim: '' }

function toTimeInputValue(value: string) {
  return value.slice(0, 5)
}

export function HorarioPage() {
  const [items, setItems] = useState<Horario[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadItems() {
    setLoading(true)
    setError(null)
    try {
      setItems(await horarioApi.list())
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  function startEdit(item: Horario) {
    setEditingId(item.id)
    setForm({
      descricao: item.descricao,
      horarioInicio: toTimeInputValue(item.horarioInicio),
      horarioFim: toTimeInputValue(item.horarioFim),
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      if (editingId !== null) {
        await horarioApi.update(editingId, form)
      } else {
        await horarioApi.create(form)
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
    if (!window.confirm('Confirma a exclusao deste horario?')) return
    setError(null)
    try {
      await horarioApi.remove(id)
      await loadItems()
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <section>
      <h1>Horarios</h1>

      {error ? <Banner kind="error" message={error} /> : null}

      <form className="crud-form" onSubmit={handleSubmit}>
        <Field label="Descricao" htmlFor="descricao" required>
          <input
            id="descricao"
            value={form.descricao}
            onChange={(event) => setForm({ ...form, descricao: event.target.value })}
            required
          />
        </Field>
        <Field label="Inicio" htmlFor="horarioInicio" required>
          <input
            id="horarioInicio"
            type="time"
            value={form.horarioInicio}
            onChange={(event) => setForm({ ...form, horarioInicio: event.target.value })}
            required
          />
        </Field>
        <Field label="Fim" htmlFor="horarioFim" required>
          <input
            id="horarioFim"
            type="time"
            value={form.horarioFim}
            onChange={(event) => setForm({ ...form, horarioFim: event.target.value })}
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
                <th>Descricao</th>
                <th>Inicio</th>
                <th>Fim</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.horarioInicio}</td>
                  <td>{item.horarioFim}</td>
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
