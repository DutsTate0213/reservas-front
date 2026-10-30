import { useEffect, useState, type FormEvent } from 'react'
import { salaApi } from '@/entities/sala'
import type { Sala } from '@/entities/sala'
import { edificioApi } from '@/entities/edificio'
import type { Edificio } from '@/entities/edificio'
import { SALA_TIPO_OPTIONS } from '@/entities/lookup'
import { extractErrorMessage } from '@/shared/api/axiosInstance'
import { Field } from '@/shared/ui/Field'
import { Button } from '@/shared/ui/Button'
import { Banner } from '@/shared/ui/Banner'

const EMPTY_FORM = { nome: '', capacidade: '', edificioId: '', salaTipoId: '' }

export function SalaPage() {
  const [items, setItems] = useState<Sala[]>([])
  const [edificios, setEdificios] = useState<Edificio[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadItems() {
    setLoading(true)
    setError(null)
    try {
      const [salas, edificiosList] = await Promise.all([salaApi.list(), edificioApi.list()])
      setItems(salas)
      setEdificios(edificiosList)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  function startEdit(item: Sala) {
    setEditingId(item.id)
    setForm({
      nome: item.nome,
      capacidade: String(item.capacidade),
      edificioId: String(item.edificio.id),
      salaTipoId: String(item.salaTipo.id),
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
      const payload = {
        nome: form.nome,
        capacidade: Number(form.capacidade),
        edificioId: Number(form.edificioId),
        salaTipoId: Number(form.salaTipoId),
      }
      if (editingId !== null) {
        await salaApi.update(editingId, payload)
      } else {
        await salaApi.create(payload)
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
    if (!window.confirm('Confirma a exclusao desta sala?')) return
    setError(null)
    try {
      await salaApi.remove(id)
      await loadItems()
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <section>
      <h1>Salas</h1>

      {error ? <Banner kind="error" message={error} /> : null}

      <form className="crud-form" onSubmit={handleSubmit}>
        <Field label="Nome" htmlFor="nome" required>
          <input
            id="nome"
            value={form.nome}
            onChange={(event) => setForm({ ...form, nome: event.target.value })}
            required
          />
        </Field>
        <Field label="Capacidade" htmlFor="capacidade" required>
          <input
            id="capacidade"
            type="number"
            min={1}
            value={form.capacidade}
            onChange={(event) => setForm({ ...form, capacidade: event.target.value })}
            required
          />
        </Field>
        <Field label="Edificio" htmlFor="edificioId" required>
          <select
            id="edificioId"
            value={form.edificioId}
            onChange={(event) => setForm({ ...form, edificioId: event.target.value })}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {edificios.map((edificio) => (
              <option key={edificio.id} value={edificio.id}>
                {edificio.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tipo de sala" htmlFor="salaTipoId" required>
          <select
            id="salaTipoId"
            value={form.salaTipoId}
            onChange={(event) => setForm({ ...form, salaTipoId: event.target.value })}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {SALA_TIPO_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nome}
              </option>
            ))}
          </select>
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
                <th>Capacidade</th>
                <th>Edificio</th>
                <th>Tipo</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.capacidade}</td>
                  <td>{item.edificio?.nome ?? '-'}</td>
                  <td>{item.salaTipo?.nome ?? '-'}</td>
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
