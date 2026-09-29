import { useState } from 'react'
import { SERVICIOS, BARBEROS, HORARIOS, MONEDA } from '../data.js'

const PASOS = ['Servicio', 'Barbero', 'Fecha y hora', 'Tus datos']

function proximosDias(n = 7) {
  const dias = []
  const hoy = new Date()
  for (let i = 0; dias.length < n; i++) {
    const d = new Date(hoy)
    d.setDate(hoy.getDate() + i)
    if (d.getDay() === 0) continue // domingo cerrado
    dias.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
  }
  return dias
}

export const formatoFecha = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short' })

export default function Reservar({ preseleccion, citas, agregarCita, setPagina }) {
  const [paso, setPaso] = useState(preseleccion.servicio ? 1 : 0)
  const [form, setForm] = useState({
    servicio: preseleccion.servicio || '',
    barbero: preseleccion.barbero || '',
    fecha: '',
    hora: '',
    nombre: '',
    telefono: '',
  })
  const [listo, setListo] = useState(false)

  const set = (campo, valor) => setForm({ ...form, [campo]: valor })
  const servicio = SERVICIOS.find((s) => s.id === form.servicio)
  const barbero = BARBEROS.find((b) => b.id === form.barbero)

  const ocupado = (hora) =>
    citas.some((c) => c.barbero === form.barbero && c.fecha === form.fecha && c.hora === hora)

  const puedeAvanzar = [
    !!form.servicio,
    !!form.barbero,
    !!form.fecha && !!form.hora,
    form.nombre.trim().length > 1 && /^\d{7,8}$/.test(form.telefono),
  ][paso]

  const confirmar = () => {
    agregarCita(form)
    setListo(true)
  }

  if (listo) {
    return (
      <section className="seccion centro">
        <div className="card confirmacion">
          <div className="check">✓</div>
          <h2>¡Cita confirmada!</h2>
          <p>{servicio.nombre} con {barbero.nombre}</p>
          <p className="muted">{formatoFecha(form.fecha)} a las {form.hora}</p>
          <button className="btn btn-primario" onClick={() => setPagina('citas')}>Ver mis citas</button>
        </div>
      </section>
    )
  }

  return (
    <section className="seccion">
      <h2>Reservar cita</h2>

      <ol className="pasos">
        {PASOS.map((p, i) => (
          <li key={p} className={i === paso ? 'actual' : i < paso ? 'hecho' : ''}>
            <span>{i + 1}</span>{p}
          </li>
        ))}
      </ol>

      <div className="panel">
        {paso === 0 && (
          <div className="opciones">
            {SERVICIOS.map((s) => (
              <button key={s.id} className={'opcion' + (form.servicio === s.id ? ' sel' : '')} onClick={() => set('servicio', s.id)}>
                <strong>{s.nombre}</strong>
                <span className="muted">{s.duracion} min · {MONEDA} {s.precio}</span>
              </button>
            ))}
          </div>
        )}

        {paso === 1 && (
          <div className="opciones">
            {BARBEROS.map((b) => (
              <button key={b.id} className={'opcion' + (form.barbero === b.id ? ' sel' : '')} onClick={() => set('barbero', b.id)}>
                <div className="avatar chico">{b.iniciales}</div>
                <strong>{b.nombre}</strong>
                <span className="muted">{b.especialidad}</span>
              </button>
            ))}
          </div>
        )}

        {paso === 2 && (
          <>
            <p className="sub">Elige el día</p>
            <div className="chips">
              {proximosDias().map((d) => (
                <button key={d} className={'chip' + (form.fecha === d ? ' sel' : '')} onClick={() => setForm({ ...form, fecha: d, hora: '' })}>
                  {formatoFecha(d)}
                </button>
              ))}
            </div>
            {form.fecha && (
              <>
                <p className="sub">Elige la hora</p>
                <div className="chips">
                  {HORARIOS.map((h) => (
                    <button key={h} disabled={ocupado(h)} className={'chip' + (form.hora === h ? ' sel' : '')} onClick={() => set('hora', h)}>
                      {h}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {paso === 3 && (
          <div className="form">
            <label>Nombre
              <input value={form.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Tu nombre" />
            </label>
            <label>Celular
              <input value={form.telefono} onChange={(e) => set('telefono', e.target.value.replace(/\D/g, ''))} placeholder="70000000" maxLength={8} />
            </label>
            <div className="resumen">
              <p><span>Servicio</span>{servicio?.nombre}</p>
              <p><span>Barbero</span>{barbero?.nombre}</p>
              <p><span>Fecha</span>{formatoFecha(form.fecha)} · {form.hora}</p>
              <p className="total"><span>Total</span>{MONEDA} {servicio?.precio}</p>
            </div>
          </div>
        )}
      </div>

      <div className="nav-pasos">
        <button className="btn btn-secundario" disabled={paso === 0} onClick={() => setPaso(paso - 1)}>Atrás</button>
        {paso < 3 ? (
          <button className="btn btn-primario" disabled={!puedeAvanzar} onClick={() => setPaso(paso + 1)}>Siguiente</button>
        ) : (
          <button className="btn btn-primario" disabled={!puedeAvanzar} onClick={confirmar}>Confirmar cita</button>
        )}
      </div>
    </section>
  )
}
