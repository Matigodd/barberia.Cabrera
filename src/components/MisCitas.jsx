import { SERVICIOS, BARBEROS, MONEDA } from '../data.js'
import { formatoFecha } from './Reservar.jsx'

export default function MisCitas({ citas, cancelarCita, irAReservar }) {
  const ordenadas = [...citas].sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))

  if (citas.length === 0) {
    return (
      <section className="seccion centro">
        <h2>Mis citas</h2>
        <p className="muted">Todavía no tienes citas reservadas.</p>
        <button className="btn btn-primario" onClick={() => irAReservar()}>Reservar ahora</button>
      </section>
    )
  }

  return (
    <section className="seccion">
      <h2>Mis citas</h2>
      <div className="lista">
        {ordenadas.map((c) => {
          const s = SERVICIOS.find((x) => x.id === c.servicio)
          const b = BARBEROS.find((x) => x.id === c.barbero)
          return (
            <div key={c.id} className="fila">
              <div>
                <h3>{s?.nombre} · {b?.nombre}</h3>
                <p className="muted">{formatoFecha(c.fecha)} a las {c.hora} · {MONEDA} {s?.precio}</p>
              </div>
              <button className="btn btn-peligro btn-chico" onClick={() => cancelarCita(c.id)}>Cancelar</button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
