import { useMemo, useState } from 'react';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';
import AppShell from '../components/layout/AppShell.jsx';
import IncidentFilters from '../components/incidents/IncidentFilters.jsx';
import IncidentFormModal from '../components/incidents/IncidentFormModal.jsx';
import IncidentList from '../components/incidents/IncidentList.jsx';
import IncidentStats from '../components/incidents/IncidentStats.jsx';
import { useIncidents } from '../hooks/useIncidents.js';

const initialFilters = {
  search: '',
  status: '',
  priority: '',
};

export default function Dashboard() {
  const { incidents, isLoading, isSaving, removeIncident, saveIncident } = useIncidents();
  const [filters, setFilters] = useState(initialFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);

  const filteredIncidents = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return incidents.filter((incident) => {
      const matchesSearch =
        !search ||
        incident.title.toLowerCase().includes(search) ||
        incident.description.toLowerCase().includes(search);
      const matchesStatus = !filters.status || incident.status === filters.status;
      const matchesPriority = !filters.priority || incident.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [filters, incidents]);

  const openCreateModal = () => {
    setEditingIncident(null);
    setIsModalOpen(true);
  };

  const openEditModal = (incident) => {
    setEditingIncident(incident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIncident(null);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Dashboard</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-950">Tablero de incidencias</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Consulta, crea, actualiza y elimina reportes del equipo de soporte.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-md bg-sky-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Nueva incidencia
          </button>
        </section>

        <IncidentStats incidents={incidents} />
        <IncidentFilters filters={filters} onChange={setFilters} onClear={() => setFilters(initialFilters)} />

        {isLoading ? (
          <Loader label="Cargando incidencias..." />
        ) : incidents.length === 0 ? (
          <EmptyState onCreate={openCreateModal} />
        ) : (
          <IncidentList
            incidents={filteredIncidents}
            onCreate={openCreateModal}
            onDelete={removeIncident}
            onEdit={openEditModal}
          />
        )}
      </div>

      <IncidentFormModal
        incident={editingIncident}
        isOpen={isModalOpen}
        isSaving={isSaving}
        onClose={closeModal}
        onSubmit={(incident) => saveIncident(incident, editingIncident)}
      />
    </AppShell>
  );
}
