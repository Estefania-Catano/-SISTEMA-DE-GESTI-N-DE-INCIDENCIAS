import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Ruta no encontrada</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          La pagina que intentas abrir no existe o fue movida.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-md bg-sky-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-800"
        >
          Volver al dashboard
        </Link>
      </section>
    </main>
  );
}
