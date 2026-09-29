import { useState } from 'react'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'barberos', label: 'Barberos' },
  { id: 'citas', label: 'Mis citas' },
]

export default function Navbar({ pagina, setPagina, totalCitas }) {
  const [abierto, setAbierto] = useState(false)
  const ir = (id) => { setPagina(id); setAbierto(false) }

  return (
    <header className="navbar">
      <button className="logo" onClick={() => ir('inicio')}>✂ EL CABRERA</button>
      <button className="menu-btn" onClick={() => setAbierto(!abierto)} aria-label="Menú">☰</button>
      <nav className={abierto ? 'abierto' : ''}>
        {LINKS.map((l) => (
          <button key={l.id} className={pagina === l.id ? 'activo' : ''} onClick={() => ir(l.id)}>
            {l.label}
            {l.id === 'citas' && totalCitas > 0 && <span className="badge">{totalCitas}</span>}
          </button>
        ))}
        <button className="btn btn-primario" onClick={() => ir('reservar')}>Reservar</button>
      </nav>
    </header>
  )
}
