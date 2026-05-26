import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', role: 'Administrador' });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.role.trim()) {
      Swal.fire('Datos incompletos', 'Ingresa tu nombre y selecciona un rol para continuar.', 'warning');
      return;
    }

    login(form);
    await Swal.fire({
      title: 'Bienvenido',
      text: 'Tu sesion fue guardada localmente.',
      icon: 'success',
      timer: 1400,
      showConfirmButton: false,
    });
    navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
  };

  return (
    <main className="grid min-h-screen bg-slate-100 lg:grid-cols-[1fr_460px]">
      <section className="hidden bg-slate-950 px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Soporte tecnico</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight">Issue Tracker</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Centraliza reportes, prioriza errores y da seguimiento al estado de cada incidencia.
          </p>
        </div>

        <div className="grid gap-4">
          {['Pendiente', 'En Progreso', 'Resuelto'].map((status) => (
            <div key={status} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-sky-200">{status}</p>
              <p className="mt-1 text-sm text-slate-300">Seguimiento claro para cada etapa del flujo.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Inicio de sesion</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Ingresa al panel</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Esta autenticacion es simulada y se conserva en LocalStorage.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Nombre
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                placeholder="Tu nombre"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Rol
              <select
                value={form.role}
                onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                <option>Administrador</option>
                <option>Analista de soporte</option>
                <option>Desarrollador</option>
                <option>QA</option>
              </select>
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-sky-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Ingresar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
