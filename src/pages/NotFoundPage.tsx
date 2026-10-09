import { Link } from "react-router-dom";
import { usePageNotFound } from "../hooks/usePageNotFound";

function NotFoundPage() {
  const url = usePageNotFound();

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md w-full p-10 text-center">
        <p className="text-7xl font-extrabold text-brand-800">404</p>
        <h1 className="text-xl font-semibold text-slate-900 mt-4">
          Página no encontrada
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          La dirección que buscas no existe o fue movida.
        </p>
        <p className="mt-4 inline-block max-w-full truncate rounded-lg bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600">
          {url}
        </p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-block px-5 py-2 bg-brand-800 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
