export default function EmptyState({ onCreate }) {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
      <p className="text-lg font-semibold text-slate-900">No hay incidencias registradas</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
        Crea el primer reporte para que el equipo pueda priorizarlo y darle seguimiento.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-6 rounded-md bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        Nueva incidencia
      </button>
    </section>
  );
}
