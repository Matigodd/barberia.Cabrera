import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Inicio from './components/Inicio.jsx'
import Servicios from './components/Servicios.jsx'
import Barberos from './components/Barberos.jsx'
import Reservar from './components/Reservar.jsx'
import MisCitas from './components/MisCitas.jsx'

function cargarCitas() {
  try {
    return JSON.parse(localStorage.getItem('citas')) || []
  } catch {
    return []
  }
}

export default function App() {
  const [pagina, setPagina] = useState('inicio')
  const [citas, setCitas] = useState(cargarCitas)
  const [preseleccion, setPreseleccion] = useState({})

  useEffect(() => {
    try { localStorage.setItem('citas', JSON.stringify(citas)) } catch { }
  }, [citas])

  const irAReservar = (datos = {}) => {
    setPreseleccion(datos)
    setPagina('reservar')
  }

  const agregarCita = (cita) => setCitas([...citas, { ...cita, id: Date.now() }])
  const cancelarCita = (id) => setCitas(citas.filter((c) => c.id !== id))

  return (
    <>
      <Navbar pagina={pagina} setPagina={setPagina} totalCitas={citas.length} />
      <main>
        {pagina === 'inicio' && <Inicio irAReservar={irAReservar} setPagina={setPagina} />}
        {pagina === 'servicios' && <Servicios irAReservar={irAReservar} />}
        {pagina === 'barberos' && <Barberos irAReservar={irAReservar} />}
        {pagina === 'reservar' && (
          <Reservar
            key={JSON.stringify(preseleccion)}
            preseleccion={preseleccion}
            citas={citas}
            agregarCita={agregarCita}
            setPagina={setPagina}
          />
        )}
        {pagina === 'citas' && <MisCitas citas={citas} cancelarCita={cancelarCita} irAReservar={irAReservar} />}
      </main>
      <footer>
        <p>Barbería CABRERA · Av. Principal #123 · Lun a Sáb 9:00 – 20:00</p>
      </footer>
    </>
  )
}
