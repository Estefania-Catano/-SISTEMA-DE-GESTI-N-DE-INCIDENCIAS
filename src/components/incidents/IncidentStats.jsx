const cards = [
  { label: 'Total', key: 'total', color: 'border-slate-300 text-slate-900' },
  { label: 'Pendientes', key: 'Pendiente', color: 'border-amber-300 text-amber-800' },
  { label: 'En progreso', key: 'En Progreso', color: 'border-sky-300 text-sky-800' },
  { label: 'Resueltas', key: 'Resuelto', color: 'border-emerald-300 text-emerald-800' },
];

export default function IncidentStats({ incidents }) {
  const stats = incidents.reduce(
    (accumulator, incident) => {
      accumulator.total += 1;
      accumulator[incident.status] = (accumulator[incident.status] || 0) + 1;
      return accumulator;
    },
    { total: 0 },
  );

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article key={card.key} className={`rounded-lg border-l-4 bg-white p-4 shadow-sm ${card.color}`}>
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-2 text-3xl font-bold">{stats[card.key] || 0}</p>
        </article>
      ))}
    </section>
  );
}
