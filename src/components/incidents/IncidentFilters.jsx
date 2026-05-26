import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../constants/incidents.js';

export default function IncidentFilters({ filters, onChange, onClear }) {
  return (
    <section className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_180px_180px_auto]">
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Buscar
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder="Titulo o descripcion"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Estado
        <select
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value })}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        >
          <option value="">Todos</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Prioridad
        <select
          value={filters.priority}
          onChange={(event) => onChange({ ...filters, priority: event.target.value })}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        >
          <option value="">Todas</option>
          {PRIORITY_OPTIONS.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={onClear}
        className="self-end rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        Limpiar
      </button>
    </section>
  );
}
