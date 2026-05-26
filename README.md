# Issue Tracker Frontend

Aplicacion web tipo SPA para gestionar incidencias de soporte tecnico. Permite iniciar sesion de forma simulada con LocalStorage, proteger rutas internas y administrar reportes mediante operaciones CRUD contra una API local con JSON Server.

## Tecnologias utilizadas

- React.js con Vite
- React Router DOM
- Hooks de React
- Tailwind CSS
- SweetAlert2
- JSON Server
- LocalStorage

## Funcionalidades

- Login en `/login` con nombre y rol.
- Persistencia simulada de sesion en LocalStorage.
- Ruta protegida `/dashboard`.
- Cierre de sesion con limpieza de LocalStorage.
- Listado de incidencias con tarjetas responsivas.
- Creacion, edicion y eliminacion de incidencias.
- Confirmacion obligatoria antes de eliminar usando SweetAlert2.
- Filtros por texto, estado y prioridad.
- Indicadores visuales por estado y prioridad.
- Manejo de errores y estados de carga.

## Instalacion local

1. Instalar dependencias:

```bash
npm install
```

2. Crear el archivo de variables de entorno:

```bash
cp .env.example .env
```

3. Levantar la API de pruebas:

```bash
npm run api
```

4. En otra terminal, levantar la aplicacion:

```bash
npm run dev
```

5. Abrir la URL local que muestra Vite, normalmente:

```bash
http://localhost:5173
```

## Scripts disponibles

- `npm run dev`: inicia la aplicacion en modo desarrollo.
- `npm run api`: inicia JSON Server en `http://localhost:3001/incidents`.
- `npm run build`: genera la version de produccion.
- `npm run preview`: previsualiza el build.
- `npm run lint`: ejecuta ESLint.

## Estructura principal

```txt
src/
  components/
  constants/
  context/
  hooks/
  pages/
  routes/
  services/
  styles/
  utils/
```

## Despliegue

Enlace de produccion: pendiente por configurar en Vercel o Netlify.
