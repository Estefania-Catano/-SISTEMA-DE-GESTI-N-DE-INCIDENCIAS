import EmptyState from '../common/EmptyState.jsx';
import IncidentCard from './IncidentCard.jsx';

export default function IncidentList({ incidents, onCreate, onDelete, onEdit }) {
  if (incidents.length === 0) {
    return <EmptyState onCreate={onCreate} />;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </section>
  );
}
