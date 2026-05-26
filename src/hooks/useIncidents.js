import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  createIncident,
  deleteIncident,
  getIncidents,
  updateIncident,
} from '../services/incidentsApi.js';

const friendlyError = 'No pudimos conectar con la API de incidencias. Verifica que JSON Server este ejecutandose.';

export function useIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadIncidents = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getIncidents();
      const sortedIncidents = Array.isArray(data)
        ? [...data].sort((first, second) => Number(second.id) - Number(first.id))
        : [];

      setIncidents(sortedIncidents);
    } catch (error) {
      Swal.fire('Algo salio mal', error.message || friendlyError, 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIncidents();
  }, [loadIncidents]);

  const saveIncident = async (incident, editingIncident) => {
    try {
      setIsSaving(true);
      const savedIncident = editingIncident
        ? await updateIncident(editingIncident.id, incident)
        : await createIncident(incident);

      setIncidents((currentIncidents) => {
        if (!editingIncident) {
          return [savedIncident, ...currentIncidents];
        }

        return currentIncidents.map((item) => (item.id === savedIncident.id ? savedIncident : item));
      });

      await Swal.fire({
        title: editingIncident ? 'Incidencia actualizada' : 'Incidencia creada',
        text: editingIncident
          ? 'Los cambios quedaron guardados correctamente.'
          : 'El nuevo reporte ya esta en el tablero.',
        icon: 'success',
        timer: 1700,
        showConfirmButton: false,
      });

      return true;
    } catch (error) {
      Swal.fire('No se pudo guardar', error.message || friendlyError, 'error');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const removeIncident = async (incident) => {
    const result = await Swal.fire({
      title: 'Eliminar incidencia',
      text: `Esta accion eliminara "${incident.title}" de forma permanente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#be123c',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteIncident(incident.id);
      setIncidents((currentIncidents) => currentIncidents.filter((item) => item.id !== incident.id));
      Swal.fire('Eliminada', 'La incidencia fue eliminada correctamente.', 'success');
    } catch (error) {
      Swal.fire('No se pudo eliminar', error.message || friendlyError, 'error');
    }
  };

  return {
    incidents,
    isLoading,
    isSaving,
    loadIncidents,
    removeIncident,
    saveIncident,
  };
}
