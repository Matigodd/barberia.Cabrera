import { BARBEROS } from '../data.js'

export default function Barberos({ irAReservar }) {
  return (
    <section className="seccion">
      <h2>Nuestro equipo</h2>
      <div className="grid">
        {BARBEROS.map((b) => (
          <div key={b.id} className="card centro">
            <div className="avatar">{b.iniciales}</div>
            <h3>{b.nombre}</h3>
            <p className="muted">{b.especialidad}</p>
            <p className="muted">{b.exp} de experiencia</p>
            <button className="btn btn-chico" onClick={() => irAReservar({ barbero: b.id })}>Reservar con {b.nombre}</button>
          </div>
        ))}
      </div>
    </section>
  )
}
