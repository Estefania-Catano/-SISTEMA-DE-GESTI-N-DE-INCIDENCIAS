export default function Loader({ label = 'Cargando...' }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-slate-600">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
