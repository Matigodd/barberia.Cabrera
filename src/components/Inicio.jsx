import { SERVICIOS, MONEDA } from '../data.js'

export default function Inicio({ irAReservar, setPagina }) {
  const destacados = SERVICIOS.slice(0, 3)
  return (
    <>
      <section className="hero">
        <div className="hero-contenido">
          <p className="etiqueta">Desde 2022</p>
          <h1>Tu estilo,<br />nuestro oficio.</h1>
          <p>Cortes, fades y barbas con barberos expertos. Reserva tu turno en menos de un minuto.</p>
          <div className="acciones">
            <button className="btn btn-primario" onClick={() => irAReservar()}>Reservar cita</button>
            <button className="btn btn-secundario" onClick={() => setPagina('servicios')}>Ver servicios</button>
          </div>
        </div>
      </section>

      <section className="seccion">
        <h2>Lo más pedido</h2>
        <div className="grid">
          {destacados.map((s) => (
            <div key={s.id} className="card">
              <h3>{s.nombre}</h3>
              <p className="muted">{s.desc}</p>
              <div className="card-pie">
                <span className="precio">{MONEDA} {s.precio}</span>
                <button className="btn btn-chico" onClick={() => irAReservar({ servicio: s.id })}>Reservar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="seccion stats">
        <div><strong>3</strong><span>barberos</span></div>
        <div><strong>+1000</strong><span>clientes</span></div>
        <div><strong>4.8★</strong><span>calificación</span></div>
      </section>
    </>
  )
}
