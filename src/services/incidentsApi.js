const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/incidents';

async function request(path = '', options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error('No fue posible completar la solicitud. Intentalo de nuevo.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getIncidents() {
  return request('');
}

export function createIncident(incident) {
  return request('', {
    method: 'POST',
    body: JSON.stringify(incident),
  });
}

export function updateIncident(id, incident) {
  return request(`/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(incident),
  });
}

export function deleteIncident(id) {
  return request(`/${id}`, {
    method: 'DELETE',
  });
}
