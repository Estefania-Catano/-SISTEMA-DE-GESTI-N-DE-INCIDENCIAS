import { useEffect, useState } from 'react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../constants/incidents.js';

const initialForm = {
  title: '',
  description: '',
  status: 'Pendiente',
  priority: 'Media',
};

export default function IncidentFormModal({ incident, isOpen, isSaving, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (incident) {
      setForm({
        title: incident.title,
        description: incident.description,
        status: incident.status,
        priority: incident.priority,
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [incident, isOpen]);

  if (!isOpen) {
    return null;
  }

  const validateForm = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = 'El titulo es obligatorio.';
    }

    if (!form.description.trim()) {
      nextErrors.description = 'La descripcion es obligatoria.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const wasSaved = await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
    });

    if (wasSaved) {
      onClose();
    }
  };

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-4 py-6 sm:items-center">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-xl font-bold text-slate-950">
            {incident ? 'Editar incidencia' : 'Nueva incidencia'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Registra la informacion necesaria para que soporte pueda priorizar el caso.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <label className="block text-sm font-semibold text-slate-700">
            Titulo
            <input
              type="text"
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Ej: Error al guardar cambios"
            />
            {errors.title && <span className="mt-1 block text-xs text-rose-600">{errors.title}</span>}
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Descripcion
            <textarea
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              rows="5"
              className="mt-1 w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Describe el problema, pasos para reproducirlo o impacto."
            />
            {errors.description && (
              <span className="mt-1 block text-xs text-rose-600">{errors.description}</span>
            )}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">
              Estado
              <select
                value={form.status}
                onChange={(event) => updateField('status', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Prioridad
              <select
                value={form.priority}
                onChange={(event) => updateField('priority', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Guardando...' : 'Guardar incidencia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
