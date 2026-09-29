import { SERVICIOS, MONEDA } from '../data.js'

export default function Servicios({ irAReservar }) {
  return (
    <section className="seccion">
      <h2>Servicios y precios</h2>
      <div className="lista">
        {SERVICIOS.map((s) => (
          <div key={s.id} className="fila">
            <div>
              <h3>{s.nombre}</h3>
              <p className="muted">{s.desc} · {s.duracion} min</p>
            </div>
            <div className="fila-der">
              <span className="precio">{MONEDA} {s.precio}</span>
              <button className="btn btn-chico" onClick={() => irAReservar({ servicio: s.id })}>Reservar</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
