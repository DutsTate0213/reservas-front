import { useEffect, useState, type FormEvent } from 'react'
import { usuarioApi } from '@/entities/usuario'
import type { Usuario } from '@/entities/usuario'
import { extractErrorMessage } from '@/shared/api/axiosInstance'
import { Field } from '@/shared/ui/Field'
import { Button } from '@/shared/ui/Button'
import { Banner } from '@/shared/ui/Banner'

const EMPTY_FORM = { nome: '', email: '', telefone: '', senha: '', ativo: true }

export function UsuarioPage() {
  const [items, setItems] = useState<Usuario[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadItems() {
    setLoading(true)
    setError(null)
    try {
      setItems(await usuarioApi.list())
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  function startEdit(item: Usuario) {
    setEditingId(item.id)
    setForm({
      nome: item.nome,
      email: item.email,
      telefone: item.telefone ?? '',
      senha: item.senha ?? '',
      ativo: item.ativo,
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
        email: form.email,
        telefone: form.telefone || undefined,
        senha: form.senha,
        ativo: form.ativo,
      }
      if (editingId !== null) {
        await usuarioApi.update(editingId, payload)
      } else {
        await usuarioApi.create(payload)
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
    if (!window.confirm('Confirma a exclusao deste usuario?')) return
    setError(null)
    try {
      await usuarioApi.remove(id)
      await loadItems()
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <section>
      <h1>Usuarios</h1>

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
        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
        </Field>
        <Field label="Telefone" htmlFor="telefone">
          <input
            id="telefone"
            value={form.telefone}
            onChange={(event) => setForm({ ...form, telefone: event.target.value })}
          />
        </Field>
        <Field label="Senha" htmlFor="senha" required>
          <input
            id="senha"
            type="password"
            value={form.senha}
            onChange={(event) => setForm({ ...form, senha: event.target.value })}
            required
          />
        </Field>
        <Field label="Ativo" htmlFor="ativo">
          <div className="field-checkbox">
            <input
              id="ativo"
              type="checkbox"
              checked={form.ativo}
              onChange={(event) => setForm({ ...form, ativo: event.target.checked })}
            />
          </div>
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
                <th>Email</th>
                <th>Telefone</th>
                <th>Ativo</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone ?? '-'}</td>
                  <td>{item.ativo ? 'Sim' : 'Nao'}</td>
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
