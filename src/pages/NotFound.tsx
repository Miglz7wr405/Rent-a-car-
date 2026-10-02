import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-3 font-display text-5xl font-semibold">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-ink-400">
        Esta página não existe ou foi movida. Volta à página inicial ou vê a frota disponível.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn-primary">Página inicial</Link>
        <Link to="/viaturas" className="btn-ghost">Ver viaturas</Link>
      </div>
    </div>
  );
}
