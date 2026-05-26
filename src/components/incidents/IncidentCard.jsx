import { PRIORITY_STYLES, STATUS_STYLES } from '../../constants/incidents.js';
import IncidentBadge from './IncidentBadge.jsx';

export default function IncidentCard({ incident, onEdit, onDelete }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <IncidentBadge className={STATUS_STYLES[incident.status]}>{incident.status}</IncidentBadge>
        <IncidentBadge className={PRIORITY_STYLES[incident.priority]}>{incident.priority}</IncidentBadge>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold leading-snug text-slate-950">{incident.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{incident.description}</p>
      </div>

      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onEdit(incident)}
          className="flex-1 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(incident)}
          className="flex-1 rounded-md border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
