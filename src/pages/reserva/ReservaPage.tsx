import { useEffect, useState, type FormEvent } from 'react'
import { reservaApi } from '@/entities/reserva'
import type { Reserva } from '@/entities/reserva'
import { usuarioApi } from '@/entities/usuario'
import type { Usuario } from '@/entities/usuario'
import { horarioApi } from '@/entities/horario'
import type { Horario } from '@/entities/horario'
import { salaApi } from '@/entities/sala'
import type { Sala } from '@/entities/sala'
import { disciplinaApi } from '@/entities/disciplina'
import type { Disciplina } from '@/entities/disciplina'
import { cursoApi } from '@/entities/curso'
import type { Curso } from '@/entities/curso'
import { RESERVA_STATUS_OPTIONS, RESERVA_TIPO_OPTIONS } from '@/entities/lookup'
import { extractErrorMessage } from '@/shared/api/axiosInstance'
import { Field } from '@/shared/ui/Field'
import { Button } from '@/shared/ui/Button'
import { Banner } from '@/shared/ui/Banner'

const EMPTY_FORM = {
  descricaoAtividade: '',
  dataReserva: '',
  usuarioId: '',
  reservaStatusId: '',
  reservaTipoId: '',
  horarioId: '',
  salaId: '',
  disciplinaId: '',
  cursoId: '',
}

export function ReservaPage() {
  const [items, setItems] = useState<Reserva[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [horarios, setHorarios] = useState<Horario[]>([])
  const [salas, setSalas] = useState<Sala[]>([])
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([])
  const [cursos, setCursos] = useState<Curso[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadItems() {
    setLoading(true)
    setError(null)
    try {
      const [reservas, usuariosList, horariosList, salasList, disciplinasList, cursosList] =
        await Promise.all([
          reservaApi.list(),
          usuarioApi.list(),
          horarioApi.list(),
          salaApi.list(),
          disciplinaApi.list(),
          cursoApi.list(),
        ])
      setItems(reservas)
      setUsuarios(usuariosList)
      setHorarios(horariosList)
      setSalas(salasList)
      setDisciplinas(disciplinasList)
      setCursos(cursosList)
    } catch (err) {
      setError(extractErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  function startEdit(item: Reserva) {
    setEditingId(item.id)
    setForm({
      descricaoAtividade: item.descricaoAtividade ?? '',
      dataReserva: item.dataReserva,
      usuarioId: String(item.usuario.id),
      reservaStatusId: String(item.reservaStatus.id),
      reservaTipoId: String(item.reservaTipo.id),
      horarioId: String(item.horario.id),
      salaId: String(item.sala.id),
      disciplinaId: item.disciplina ? String(item.disciplina.id) : '',
      cursoId: item.curso ? String(item.curso.id) : '',
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
        descricaoAtividade: form.descricaoAtividade || undefined,
        dataReserva: form.dataReserva,
        usuarioId: Number(form.usuarioId),
        reservaStatusId: Number(form.reservaStatusId),
        reservaTipoId: Number(form.reservaTipoId),
        horarioId: Number(form.horarioId),
        salaId: Number(form.salaId),
        disciplinaId: form.disciplinaId ? Number(form.disciplinaId) : null,
        cursoId: form.cursoId ? Number(form.cursoId) : null,
      }
      if (editingId !== null) {
        await reservaApi.update(editingId, payload)
      } else {
        await reservaApi.create(payload)
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
    if (!window.confirm('Confirma a exclusao desta reserva?')) return
    setError(null)
    try {
      await reservaApi.remove(id)
      await loadItems()
    } catch (err) {
      setError(extractErrorMessage(err))
    }
  }

  return (
    <section>
      <h1>Reservas</h1>

      {error ? <Banner kind="error" message={error} /> : null}

      <form className="crud-form" onSubmit={handleSubmit}>
        <Field label="Descricao da atividade" htmlFor="descricaoAtividade">
          <input
            id="descricaoAtividade"
            value={form.descricaoAtividade}
            onChange={(event) => setForm({ ...form, descricaoAtividade: event.target.value })}
          />
        </Field>
        <Field label="Data" htmlFor="dataReserva" required>
          <input
            id="dataReserva"
            type="date"
            value={form.dataReserva}
            onChange={(event) => setForm({ ...form, dataReserva: event.target.value })}
            required
          />
        </Field>
        <Field label="Usuario" htmlFor="usuarioId" required>
          <select
            id="usuarioId"
            value={form.usuarioId}
            onChange={(event) => setForm({ ...form, usuarioId: event.target.value })}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status" htmlFor="reservaStatusId" required>
          <select
            id="reservaStatusId"
            value={form.reservaStatusId}
            onChange={(event) => setForm({ ...form, reservaStatusId: event.target.value })}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {RESERVA_STATUS_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tipo" htmlFor="reservaTipoId" required>
          <select
            id="reservaTipoId"
            value={form.reservaTipoId}
            onChange={(event) => setForm({ ...form, reservaTipoId: event.target.value })}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {RESERVA_TIPO_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Horario" htmlFor="horarioId" required>
          <select
            id="horarioId"
            value={form.horarioId}
            onChange={(event) => setForm({ ...form, horarioId: event.target.value })}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {horarios.map((horario) => (
              <option key={horario.id} value={horario.id}>
                {horario.descricao} ({horario.horarioInicio.slice(0, 5)} -{' '}
                {horario.horarioFim.slice(0, 5)})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sala" htmlFor="salaId" required>
          <select
            id="salaId"
            value={form.salaId}
            onChange={(event) => setForm({ ...form, salaId: event.target.value })}
            required
          >
            <option value="" disabled>
              Selecione...
            </option>
            {salas.map((sala) => (
              <option key={sala.id} value={sala.id}>
                {sala.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Disciplina" htmlFor="disciplinaId">
          <select
            id="disciplinaId"
            value={form.disciplinaId}
            onChange={(event) => setForm({ ...form, disciplinaId: event.target.value })}
          >
            <option value="">Nenhuma</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.id} value={disciplina.id}>
                {disciplina.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Curso" htmlFor="cursoId">
          <select
            id="cursoId"
            value={form.cursoId}
            onChange={(event) => setForm({ ...form, cursoId: event.target.value })}
          >
            <option value="">Nenhum</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
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
                <th>Data</th>
                <th>Usuario</th>
                <th>Status</th>
                <th>Tipo</th>
                <th>Horario</th>
                <th>Sala</th>
                <th>Disciplina</th>
                <th>Curso</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.dataReserva}</td>
                  <td>{item.usuario?.nome}</td>
                  <td>{item.reservaStatus?.nome}</td>
                  <td>{item.reservaTipo?.nome}</td>
                  <td>{item.horario?.descricao}</td>
                  <td>{item.sala?.nome}</td>
                  <td>{item.disciplina?.nome ?? '-'}</td>
                  <td>{item.curso?.nome ?? '-'}</td>
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
