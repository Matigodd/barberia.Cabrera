# ✂ Barbería El CABRERA — Prototipo Front-end
integrantes 
Matias Choque
Matias Martinez
Dieter Kollros
Primer prototipo del proyecto (React + Vite), hecho con vibe-coding.

## Funcionalidades
- **Inicio**: presentación y servicios destacados
- **Servicios**: lista de servicios con precios y duración
- **Barberos**: equipo y especialidades
- **Reservar**: flujo en 4 pasos (servicio → barbero → fecha/hora → datos). Los horarios ya reservados aparecen deshabilitados.
- **Mis citas**: ver y cancelar citas (se guardan en el navegador con `localStorage`)

## Cómo correrlo
```bash
npm install
npm run dev
```

## Estructura
```
src/
  App.jsx            # estado global (página actual, citas)
  data.js            # servicios, barberos, horarios
  components/        # Navbar, Inicio, Servicios, Barberos, Reservar, MisCitas
  styles.css
```
